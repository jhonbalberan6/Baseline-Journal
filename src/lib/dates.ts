const dateFormatter = new Intl.DateTimeFormat(undefined, {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

export function toLocalDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function todayKey(): string {
  return toLocalDateKey(new Date());
}

export function parseDateKey(key: string): Date {
  const [year, month, day] = key.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function addDays(key: string, amount: number): string {
  const date = parseDateKey(key);
  date.setDate(date.getDate() + amount);
  return toLocalDateKey(date);
}

export function yesterdayKey(from = new Date()): string {
  const date = new Date(from);
  date.setDate(date.getDate() - 1);
  return toLocalDateKey(date);
}

export function formatDateKey(key: string): string {
  return dateFormatter.format(parseDateKey(key));
}

export function compactDateRange(start?: string, end?: string): string {
  if (!start || !end) return 'No entries yet';
  if (start === end) return formatDateKey(start);
  return `${formatDateKey(start)} to ${formatDateKey(end)}`;
}
