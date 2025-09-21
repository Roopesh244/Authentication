import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getServerSupabase } from '@/utils/supabase/server';

export async function middleware(req: NextRequest) {
  const supabase = getServerSupabase();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard'],
};
