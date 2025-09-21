import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function getServerSupabase() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async getAll() {
          return (await cookies()).getAll();
        },
        setAll(newCookies) {
          newCookies.forEach(async ({ name, value, options }) => {
            try {
              (await cookies()).set(name, value, options);
            } catch {
              // ignore if immutable (middleware limitation)
            }
          });
        },
      },
    }
  );
}
