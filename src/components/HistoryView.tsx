import { ArrowDownAZ, ArrowUpAZ, Image, Moon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { formatDateKey } from '../lib/dates';
import type { DailyLog } from '../types';

type HistoryViewProps = {
  logs: DailyLog[];
};

export function HistoryView({ logs }: HistoryViewProps) {
  const [ascending, setAscending] = useState(false);
  const orderedLogs = useMemo(
    () => [...logs].sort((a, b) => (ascending ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date))),
    [ascending, logs],
  );

  return (
    <section className="surface p-4 sm:p-5" aria-label="Journal history">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-medium text-stone-100">History</h2>
          <p className="mt-1 text-sm text-stone-400">{logs.length} saved {logs.length === 1 ? 'entry' : 'entries'}</p>
        </div>
        <button className="icon-button" type="button" onClick={() => setAscending((value) => !value)} aria-label="Toggle history sort order">
          {ascending ? <ArrowDownAZ size={18} aria-hidden="true" /> : <ArrowUpAZ size={18} aria-hidden="true" />}
        </button>
      </div>

      {orderedLogs.length === 0 ? (
        <p className="rounded-lg border border-dashed border-stone-700 p-5 text-sm leading-6 text-stone-400">
          Saved entries will gather here quietly.
        </p>
      ) : (
        <div className="space-y-3">
          {orderedLogs.map((log) => (
            <article key={log.date} className="history-item">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-medium text-stone-100">{formatDateKey(log.date)}</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {log.isZeroEnergy ? (
                      <span className="pill">
                        <Moon size={13} aria-hidden="true" />
                        Zero-energy
                      </span>
                    ) : null}
                    {log.proofImageBase64 ? (
                      <span className="pill">
                        <Image size={13} aria-hidden="true" />
                        Photo
                      </span>
                    ) : null}
                  </div>
                </div>
                {log.proofImageBase64 ? <img className="h-14 w-14 shrink-0 rounded-md object-cover" src={log.proofImageBase64} alt="" /> : null}
              </div>
              <p className="mt-4 whitespace-pre-wrap font-serif text-base leading-7 text-stone-300">{log.journalEntry}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
