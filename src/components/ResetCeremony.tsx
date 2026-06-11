import { AlertTriangle, ShieldCheck, Trash2, X } from 'lucide-react';
import { useState } from 'react';

type ResetCeremonyProps = {
  onReset: () => Promise<void>;
};

export function ResetCeremony({ onReset }: ResetCeremonyProps) {
  const [open, setOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleReset() {
    setBusy(true);
    try {
      await onReset();
      setOpen(false);
      setConfirmed(false);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <section className="surface border-red-900/50 p-4" aria-label="Reset ceremony">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-red-950 text-amber-200">
            <ShieldCheck size={19} aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-medium text-stone-100">Reset Ceremony</h2>
            <p className="mt-1 text-sm leading-6 text-stone-400">Clear local journal entries after your booklet is safely exported.</p>
          </div>
        </div>
        <button className="button-caution mt-4 w-full justify-center" type="button" onClick={() => setOpen(true)}>
          <Trash2 size={17} aria-hidden="true" />
          Prepare Reset
        </button>
      </section>

      {open ? (
        <div className="fixed inset-0 z-40 grid place-items-center bg-stone-950/80 p-4" role="dialog" aria-modal="true" aria-labelledby="reset-title">
          <div className="w-full max-w-md rounded-2xl border border-red-900/60 bg-stone-925 p-5 shadow-tactile">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-red-950 text-amber-200">
                  <AlertTriangle size={20} aria-hidden="true" />
                </span>
                <div>
                  <h2 id="reset-title" className="text-lg font-medium text-stone-100">
                    Wipe local entries
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-stone-400">
                    This clears every saved daily log from this device. Your exported Zine PDF is the handoff point before a clean reset.
                  </p>
                </div>
              </div>
              <button className="icon-button" type="button" onClick={() => setOpen(false)} aria-label="Close reset modal">
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <label className="flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-sm leading-6 text-stone-200">
              <input
                className="mt-1 h-4 w-4 accent-amber-500"
                type="checkbox"
                checked={confirmed}
                onChange={(event) => setConfirmed(event.target.checked)}
              />
              <span>“I confirm that I have successfully downloaded and verified my monthly Zine PDF booklet.”</span>
            </label>

            <button className="button-danger mt-5 w-full justify-center" type="button" onClick={() => void handleReset()} disabled={!confirmed || busy}>
              <Trash2 size={17} aria-hidden="true" />
              {busy ? 'Wiping' : 'Wipe All Data'}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
