'use client';

import { supabase } from './supabase-client';

export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}