import AsyncStorage from '@react-native-async-storage/async-storage';

export function getTodayString() {
  return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
}

function getDailyKey(category) {
  return `daily-${getTodayString()}-${category}`;
}

function getStreakKey(category) {
  return `streak-${category}`;
}

export async function getDailyResult(category) {
  try {
    const raw = await AsyncStorage.getItem(getDailyKey(category));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function saveDailyResult(category, { score, hist }) {
  try {
    await AsyncStorage.setItem(
      getDailyKey(category),
      JSON.stringify({ score, hist, completedAt: new Date().toISOString() })
    );
  } catch {}
}

export async function getStreak(category) {
  try {
    const raw = await AsyncStorage.getItem(getStreakKey(category));
    return raw ? JSON.parse(raw) : { current: 0, lastPlayed: null };
  } catch {
    return { current: 0, lastPlayed: null };
  }
}

export async function updateStreak(category) {
  const today = getTodayString();
  const streak = await getStreak(category);
  const { lastPlayed } = streak;
  let { current } = streak;

  if (lastPlayed === today) return; // already updated today

  if (lastPlayed) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    current = lastPlayed === yesterdayStr ? current + 1 : 1;
  } else {
    current = 1;
  }

  try {
    await AsyncStorage.setItem(
      getStreakKey(category),
      JSON.stringify({ current, lastPlayed: today })
    );
  } catch {}
}
