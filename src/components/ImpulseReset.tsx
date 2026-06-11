import { useEffect, useState } from 'react';
import { readSettings } from '../lib/settings';

type ImpulseResetProps = {
  visible: boolean;
  onComplete: () => void;
};

export function ImpulseReset({ visible, onComplete }: ImpulseResetProps) {
  const [seconds, setSeconds] = useState(0);
  const [fading, setFading] = useState(false);
  const settings = readSettings();

  useEffect(() => {
    if (!visible || settings.resetDuration === 0) {
      onComplete();
      return;
    }

    setSeconds(settings.resetDuration);
    setFading(false);

    const interval = window.setInterval(() => {
      setSeconds((current) => {
        if (current <= 1) {
          window.clearInterval(interval);
          setFading(true);
          window.setTimeout(onComplete, 450);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [onComplete, visible, settings.resetDuration]);

  if (!visible || settings.resetDuration === 0) return null;

  return (
    <div
      className={`fixed inset-0 z-50 grid place-items-center bg-stone-950/95 px-6 transition-opacity duration-500 ${
        fading ? 'opacity-0' : 'opacity-100'
      }`}
      role="alertdialog"
      aria-modal="true"
      aria-label="Grounding pause"
    >
      <div className="flex flex-col items-center text-center">
        <div className="breathing-ring mb-9 grid h-44 w-44 place-items-center rounded-full border border-amber-500/40">
          <div className="h-24 w-24 rounded-full border border-stone-500/50 bg-stone-900/40" />
        </div>
        <p className="font-serif text-5xl text-stone-100">{seconds}</p>
        <p className="mt-4 max-w-xs text-sm leading-6 text-stone-400">Let the day settle before you write.</p>
      </div>
    </div>
  );
}

