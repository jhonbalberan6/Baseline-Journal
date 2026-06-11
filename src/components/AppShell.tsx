import type { ReactNode } from 'react';
import type { BaselineStats } from '../lib/streaks';

type AppShellProps = {
  stats: BaselineStats;
  children: ReactNode;
};

export function AppShell({ stats, children }: AppShellProps) {
  return (
    <main className="min-h-screen bg-stone-950 text-stone-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-amber-400">Private local ritual</p>
            <h1 className="mt-2 text-2xl font-semibold text-stone-100">Baseline Journal</h1>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:w-64">
            <Stat label="Streak" value={stats.streak} />
          </div>
        </header>
        {children}
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-stone-800 bg-stone-900/80 px-4 py-3">
      <p className="text-xs text-stone-500">{label}</p>
      <p className="mt-1 font-serif text-2xl text-amber-300">{value}</p>
    </div>
  );
}

