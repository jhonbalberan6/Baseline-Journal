import { CalendarDays, ChevronLeft, ChevronRight, LocateFixed } from 'lucide-react';
import { addDays, formatDateKey, todayKey } from '../lib/dates';

type DateNavigatorProps = {
  selectedDate: string;
  onChange: (date: string) => void;
};

export function DateNavigator({ selectedDate, onChange }: DateNavigatorProps) {
  const today = todayKey();
  const prevDate = addDays(selectedDate, -1);
  const nextDate = addDays(selectedDate, 1);

  return (
    <section className="surface flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between" aria-label="Date navigation">
      <div className="flex min-w-0 items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-amber-500/10 text-amber-400">
          <CalendarDays size={20} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.18em] text-stone-500">Selected day</p>
          <h1 className="truncate text-lg font-medium text-stone-100">{formatDateKey(selectedDate)}</h1>
        </div>
      </div>
      <div className="grid grid-cols-[44px_1fr_44px] gap-2 sm:flex sm:items-center">
        <button className="icon-button" type="button" onClick={() => onChange(prevDate)} aria-label="Previous day">
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <button className="button-secondary min-h-11 justify-center" type="button" onClick={() => onChange(today)} disabled={selectedDate === today}>
          <LocateFixed size={17} aria-hidden="true" />
          Today
        </button>
        <button className="icon-button" type="button" onClick={() => onChange(nextDate)} disabled={selectedDate === today} aria-label="Next day">
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
