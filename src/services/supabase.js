import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://uhvguowugfsurpupaxsq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVodmd1b3d1Z2ZzdXJwdXBheHNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5NjkxNzEsImV4cCI6MjAxNTU0NTE3MX0.NO0d5hwzWqtVw_r_WkKiUmAe2e1JG4-8f_bFu4mmi9c";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
