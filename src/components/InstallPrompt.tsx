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
  
  // If we're on Android/Chrome but the event hasn't fired yet
  const showFallback = !promptEvent && !ios && !installed;

  async function handleInstall() {
    if (!promptEvent) return;
    await promptEvent.prompt();
    await promptEvent.userChoice;
    setPromptEvent(null);
  }

  return (
    <section className="surface border-2 border-amber-500/20 p-4" aria-label="Install app">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-amber-500/10 text-amber-300">
          <Smartphone size={19} aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold text-stone-100">Get the Full App Experience</h2>
          <p className="mt-1 text-sm leading-5 text-stone-400">
            {ios 
              ? 'On iPhone: Tap Share → "Add to Home Screen" to remove browser bars.' 
              : showFallback
              ? 'Android Chrome: Tap Menu (⋮) → "Install app" to get the physical app.'
              : 'Don\'t just add a shortcut—install the full standalone app for the best experience.'}
          </p>
        </div>
      </div>
      {promptEvent ? (
        <button 
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 py-2.5 text-sm font-bold text-stone-900 transition-colors hover:bg-amber-400 active:scale-[0.98]" 
          type="button" 
          onClick={() => void handleInstall()}
        >
          <Download size={18} aria-hidden="true" />
          Install Full App
        </button>
      ) : showFallback ? (
        <div className="mt-3 rounded bg-stone-800/50 p-2 text-xs text-stone-500 italic">
          Waiting for Chrome to verify app compatibility...
        </div>
      ) : null}
    </section>
  );
}
