export type RawMadLibData = {
  brainState: string;
  focusState: string;
  groundingSensation: string;
};

export type DailyLog = {
  date: string;
  journalEntry: string;
  isZeroEnergy: boolean;
  rawMadLibData?: RawMadLibData;
  proofImageBase64: string | null;
};

export type EntryMode = 'standard' | 'zero';

export type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

export type AppSettings = {
  resetDuration: 0 | 3 | 5 | 10;
  resetOnDateChange: boolean;
  resetOnAppStart: boolean;
};

