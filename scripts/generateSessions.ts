import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';


// 1. Connect to Supabase
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // IMPORTANT: service role, not anon
);

// 2. Configuration
const BOOK_ID = 'test-book';
const CAPACITY = 6;

async function generateTodaySessions() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();

  const sessions = [];

  for (let hour = 0; hour < 24; hour++) {
    // 30-min @ :00
    sessions.push({
      book_id: BOOK_ID,
      start_time_utc: new Date(year, month, day, hour, 0).toISOString(),
      duration_minutes: 30,
      capacity: CAPACITY,
    });

    // 30-min @ :30
    sessions.push({
      book_id: BOOK_ID,
      start_time_utc: new Date(year, month, day, hour, 30).toISOString(),
      duration_minutes: 30,
      capacity: CAPACITY,
    });

    // 60-min @ :00
    sessions.push({
      book_id: BOOK_ID,
      start_time_utc: new Date(year, month, day, hour, 0).toISOString(),
      duration_minutes: 60,
      capacity: CAPACITY,
    });
  }

  // 3. Insert (ignore duplicates later with constraints)
  const { error } = await supabase
    .from('sessions')
    .insert(sessions);

  if (error) {
    console.error(error);
  } else {
    console.log('✅ Sessions generated for today');
  }
}

generateTodaySessions();
