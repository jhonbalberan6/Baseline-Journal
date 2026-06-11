import { todayKey, yesterdayKey } from './dates';

const STREAK_KEY = 'baseline_active_streak';
const LAST_ACTIVE_KEY = 'baseline_last_active_date';

export type BaselineStats = {
  streak: number;
  lastActiveDate: string | null;
};

function readNumber(key: string): number {
  const value = Number.parseInt(localStorage.getItem(key) ?? '0', 10);
  return Number.isFinite(value) ? value : 0;
}

export function readBaselineStats(): BaselineStats {
  return {
    streak: readNumber(STREAK_KEY),
    lastActiveDate: localStorage.getItem(LAST_ACTIVE_KEY),
  };
}

export function recordSuccessfulSave(): BaselineStats {
  const today = todayKey();
  const previous = readBaselineStats();
  let nextStreak = previous.streak;

  if (previous.lastActiveDate !== today) {
    nextStreak = previous.lastActiveDate === yesterdayKey() ? previous.streak + 1 : 1;
  }

  localStorage.setItem(STREAK_KEY, String(nextStreak));
  localStorage.setItem(LAST_ACTIVE_KEY, today);

  return {
    streak: nextStreak,
    lastActiveDate: today,
  };
}

export function resetBaselineStats(): BaselineStats {
  localStorage.setItem(STREAK_KEY, '0');
  localStorage.removeItem(LAST_ACTIVE_KEY);
  return readBaselineStats();
}

