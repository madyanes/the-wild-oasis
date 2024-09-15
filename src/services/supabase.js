import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://pafpkkiozjhdngkwefxr.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhZnBra2lvempoZG5na3dlZnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4NzIzMjksImV4cCI6MjA0MTQ0ODMyOX0.29OHcDfjcCP9FdyIjBXwjAjzx5xTHI83NLCrxRMflRQ'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
