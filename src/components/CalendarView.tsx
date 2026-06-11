import { ChevronLeft, ChevronRight, Moon } from 'lucide-react';
import { useState } from 'react';
import { addDays, toLocalDateKey } from '../lib/dates';
import type { DailyLog } from '../types';

type CalendarViewProps = {
  selectedDate: string;
  logs: DailyLog[];
  onDateSelect: (date: string) => void;
};

export function CalendarView({ selectedDate, logs, onDateSelect }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const [year, month] = selectedDate.split('-');
    return `${year}-${month}`;
  });

  const [year, month] = currentMonth.split('-').map(Number);
  const today = new Date();
  const todayKey = toLocalDateKey(today);

  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const logsMap = new Map(logs.map((log) => [log.date, log]));

  const prevMonth = () => {
    const date = new Date(year, month - 2, 1);
    setCurrentMonth(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`);
  };

  const nextMonth = () => {
    const date = new Date(year, month, 1);
    setCurrentMonth(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`);
  };

  const goToToday = () => {
    setCurrentMonth(todayKey.slice(0, 7));
    onDateSelect(todayKey);
  };

  const days = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <section className="surface space-y-4 p-4 sm:p-5" aria-label="Calendar view">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-medium text-stone-100">
            {new Date(year, month - 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
        </div>
        <div className="flex gap-2">
          <button className="icon-button" type="button" onClick={prevMonth} aria-label="Previous month">
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button className="button-secondary min-h-11 px-3 text-xs" type="button" onClick={goToToday}>
            Today
          </button>
          <button className="icon-button" type="button" onClick={nextMonth} aria-label="Next month">
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-stone-400">
            {day}
          </div>
        ))}

        {days.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} />;
          }

          const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const log = logsMap.get(dateKey);
          const isSelected = selectedDate === dateKey;
          const isToday = dateKey === todayKey;
          const isFuture = dateKey > todayKey;

          return (
            <button
              key={dateKey}
              type="button"
              onClick={() => onDateSelect(dateKey)}
              disabled={isFuture}
              className={`group relative flex h-12 flex-col items-center justify-center rounded-lg text-xs font-medium transition ${
                isSelected
                  ? 'border border-amber-500 bg-amber-500/20 text-amber-200'
                  : log
                    ? 'border border-stone-700 bg-stone-900/60 text-stone-100 hover:border-amber-500/50'
                    : 'border border-stone-800 bg-stone-950/40 text-stone-500 hover:border-stone-700'
              } ${isFuture ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}`}
              aria-label={`${dateKey}${log ? ' - has entry' : ''}`}
            >
              <span>{day}</span>
              {log && (
                <div className="mt-0.5 flex gap-0.5">
                  {log.isZeroEnergy && <Moon size={10} aria-hidden="true" />}
                  {log.proofImageBase64 && <div className="h-1 w-1 rounded-full bg-amber-400" />}
                </div>
              )}
              {isToday && <div className="absolute bottom-0.5 h-0.5 w-1.5 rounded-full bg-amber-400" />}
            </button>
          );
        })}
      </div>

      <div className="border-t border-stone-800 pt-3 text-xs text-stone-400">
        <p>{logs.length} total entries • {selectedDate === todayKey ? 'Today selected' : 'Select a date to view'}</p>
      </div>
    </section>
  );
}
