import type { AppSettings } from '../types';

const SETTINGS_KEY = 'baseline_app_settings';

const DEFAULT_SETTINGS: AppSettings = {
  resetDuration: 3,
  resetOnDateChange: true,
  resetOnAppStart: false,
};

export function readSettings(): AppSettings {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    }
  } catch (err) {
    console.error('Failed to read settings:', err);
  }
  return DEFAULT_SETTINGS;
}

export function updateSettings(partial: Partial<AppSettings>): AppSettings {
  const current = readSettings();
  const updated = { ...current, ...partial };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
  return updated;
}

export function resetSettings(): AppSettings {
  localStorage.removeItem(SETTINGS_KEY);
  return DEFAULT_SETTINGS;
}
