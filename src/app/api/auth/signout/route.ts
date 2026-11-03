import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { SITE } from "@/content/site";

export async function POST(request: Request) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  const origin = new URL(request.url).origin || SITE.url;
  return NextResponse.redirect(new URL("/login", origin));
}
