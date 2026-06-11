import { BookOpen, Download } from 'lucide-react';
import { useState } from 'react';
import { exportZinePdf } from '../lib/zineExport';
import type { DailyLog } from '../types';

type ZineExportProps = {
  logs: DailyLog[];
};

export function ZineExport({ logs }: ZineExportProps) {
  const [exporting, setExporting] = useState(false);

  async function handleExport() {
    setExporting(true);
    try {
      await exportZinePdf(logs);
    } finally {
      setExporting(false);
    }
  }

  return (
    <section className="surface p-4" aria-label="Zine export">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-amber-500/10 text-amber-300">
          <BookOpen size={19} aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-medium text-stone-100">Monthly Zine</h2>
          <p className="mt-1 text-sm leading-6 text-stone-400">Export every local entry into an editorial PDF booklet.</p>
        </div>
      </div>
      <button className="button-secondary mt-4 w-full justify-center" type="button" onClick={() => void handleExport()} disabled={logs.length === 0 || exporting}>
        <Download size={17} aria-hidden="true" />
        {exporting ? 'Building PDF' : 'Download Zine PDF'}
      </button>
    </section>
  );
}
