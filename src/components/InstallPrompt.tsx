import { Download, Smartphone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { isIosSafari, isStandaloneMode } from '../lib/pwaInstall';
import type { InstallPromptEvent } from '../types';

export function InstallPrompt() {
  const [promptEvent, setPromptEvent] = useState<InstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [ios, setIos] = useState(false);

  useEffect(() => {
    setInstalled(isStandaloneMode());
    setIos(isIosSafari());

    function handlePrompt(event: Event) {
      event.preventDefault();
      setPromptEvent(event as InstallPromptEvent);
    }

    function handleInstalled() {
      setInstalled(true);
      setPromptEvent(null);
    }

    window.addEventListener('beforeinstallprompt', handlePrompt);
    window.addEventListener('appinstalled', handleInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', handlePrompt);
      window.removeEventListener('appinstalled', handleInstalled);
    };
  }, []);

  if (installed) return null;
  if (!promptEvent && !ios) return null;

  async function handleInstall() {
    if (!promptEvent) return;
    await promptEvent.prompt();
    await promptEvent.userChoice;
    setPromptEvent(null);
  }

  return (
    <section className="surface p-4" aria-label="Install app">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-amber-500/10 text-amber-300">
          <Smartphone size={19} aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-medium text-stone-100">Install Baseline</h2>
          <p className="mt-1 text-sm leading-6 text-stone-400">
            {ios ? 'On iPhone or iPad, use Share → Add to Home Screen.' : 'Keep the journal on your home screen for offline use.'}
          </p>
        </div>
      </div>
      {promptEvent ? (
        <button className="button-secondary mt-4 w-full justify-center" type="button" onClick={() => void handleInstall()}>
          <Download size={17} aria-hidden="true" />
          Install App
        </button>
      ) : null}
    </section>
  );
}
