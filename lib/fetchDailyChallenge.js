import { supabase } from './supabase';

function getTodayString() {
  return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
}

export async function fetchDailyChallenge(category) {
  const date = getTodayString();
  try {
    const { data, error } = await supabase
      .from('daily_challenges')
      .select('questions')
      .eq('date', date)
      .eq('category', category)
      .eq('published', true)
      .single();

    if (error || !data) return null;
    return data.questions;
  } catch {
    return null;
  }
}
