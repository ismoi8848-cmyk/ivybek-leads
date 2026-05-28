import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Lead = {
  id?: string;
  created_at?: string;
  student_name: string;
  grade: string;
  school: string;
  target_universities: string[];
  intended_major: string;
  timeline: string;
  parent_name: string;
  email: string;
  phone: string;
  how_heard: string;
};
