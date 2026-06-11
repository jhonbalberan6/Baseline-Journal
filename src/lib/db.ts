import { openDB, type DBSchema } from 'idb';
import type { DailyLog } from '../types';

interface BaselineJournalSchema extends DBSchema {
  dailyLogs: {
    key: string;
    value: DailyLog;
    indexes: { date: string };
  };
}

const DB_NAME = 'BaselineJournalDB';
const STORE_NAME = 'dailyLogs';

const dbPromise = openDB<BaselineJournalSchema>(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      const store = db.createObjectStore(STORE_NAME, { keyPath: 'date' });
      store.createIndex('date', 'date');
    }
  },
});

export async function getDailyLog(date: string): Promise<DailyLog | undefined> {
  try {
    return (await dbPromise).get(STORE_NAME, date);
  } catch (err) {
    console.error('Failed to load journal entry:', err);
    throw new Error('Could not load journal entry. Please try again.');
  }
}

export async function saveDailyLog(log: DailyLog): Promise<void> {
  try {
    await (await dbPromise).put(STORE_NAME, log);
  } catch (err) {
    console.error('Failed to save journal entry:', err);
    throw new Error('Could not save journal entry. Your device storage may be full.');
  }
}

export async function getAllDailyLogs(): Promise<DailyLog[]> {
  try {
    return (await dbPromise).getAll(STORE_NAME);
  } catch (err) {
    console.error('Failed to load journal entries:', err);
    return [];
  }
}

export async function clearDailyLogs(): Promise<void> {
  try {
    await (await dbPromise).clear(STORE_NAME);
  } catch (err) {
    console.error('Failed to clear journal entries:', err);
    throw new Error('Could not clear journal entries. Please try again.');
  }
}
