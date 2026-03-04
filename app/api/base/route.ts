import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json(
      { error: "Missing Supabase environment variables" },
      { status: 500 },
    );
  }

  try {
    const body = await request.json();
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data, error } = await supabase
      .from("wishlist")
      .insert({ email: body?.email, name: body?.name })
      .select();

    if (error) {
      console.error("Error inserting into waitlist", error);
      return NextResponse.json(
        { error: error.message ?? "Failed to add to waitlist" },
        { status: 500 },
      );
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
