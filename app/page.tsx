import { ContentPlanner } from '@/components/content-planner';
import { DashboardSection } from '@/components/dashboard-section';
import { Sidebar } from '@/components/sidebar';

export default function Home() {
  return (
    <main className="min-h-screen lg:flex">
      <Sidebar />
      <div className="flex-1 space-y-8 p-4 md:p-8">
        <DashboardSection />
        <ContentPlanner />
      </div>
    </main>
  );
}
