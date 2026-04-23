'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-client';
import { Sidebar } from '@/components/sidebar';
import { DashboardSection } from '@/components/dashboard-section';

type Profile = {
  id: string;
  full_name: string | null;
  role: string | null;
};

type Client = {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  project_phase: string | null;
  next_milestone: string | null;
};

export default function DashboardPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push('/login');
        return;
      }

      const profileResponse = await supabase
        .from('profiles')
        .select('id, full_name, role')
        .eq('id', user.id)
        .single();

      if (profileResponse.error) {
        console.error('Profile ophalen mislukt:', profileResponse.error.message);
        setLoading(false);
        return;
      }

      setProfile(profileResponse.data);

      const clientLinkResponse = await supabase
        .from('client_users')
        .select('client_id')
        .eq('profile_id', user.id)
        .eq('is_primary_contact', true)
        .single();

      if (clientLinkResponse.error) {
        console.error('Client koppeling ophalen mislukt:', clientLinkResponse.error.message);
        setLoading(false);
        return;
      }

      const clientResponse = await supabase
        .from('clients')
        .select('id, name, slug, logo_url, project_phase, next_milestone')
        .eq('id', clientLinkResponse.data.client_id)
        .single();

      if (clientResponse.error) {
        console.error('Client ophalen mislukt:', clientResponse.error.message);
        setLoading(false);
        return;
      }

      setClient(clientResponse.data);
      setLoading(false);
    }

    loadDashboard();
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FFFAEB] lg:flex">
        <Sidebar />
        <div className="flex-1 p-4 md:p-8">
          <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            Laden...
          </div>
        </div>
      </main>
    );
  }

  if (!profile || !client) {
    return (
      <main className="min-h-screen bg-[#FFFAEB] lg:flex">
        <Sidebar />
        <div className="flex-1 p-4 md:p-8">
          <div className="rounded-[24px] border border-rose-200 bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-semibold text-rose-700">
              Dashboard kon niet geladen worden
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Er ontbreekt profiel- of klantdata in Supabase.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFFAEB] lg:flex">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8">
        <DashboardSection
          profile={profile}
          client={client}
        />
      </div>
    </main>
  );
}