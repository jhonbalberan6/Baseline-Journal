import { Settings as SettingsIcon, X } from 'lucide-react';
import { useState } from 'react';
import { readSettings, updateSettings } from '../lib/settings';
import type { AppSettings } from '../types';

export function SettingsPanel() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(readSettings());

  const handleChange = (updates: Partial<AppSettings>) => {
    const updated = { ...settings, ...updates };
    setSettings(updated);
    updateSettings(updated);
  };

  return (
    <>
      <button
        className="icon-button fixed bottom-4 right-4 z-40 md:relative md:bottom-auto md:right-auto"
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open settings"
      >
        <SettingsIcon size={18} aria-hidden="true" />
      </button>

      {open ? (
        <div className="fixed inset-0 z-40 grid place-items-center bg-stone-950/80 p-4" role="dialog" aria-modal="true" aria-labelledby="settings-title">
          <div className="w-full max-w-sm rounded-2xl border border-stone-800 bg-stone-900/90 p-5 shadow-tactile">
            <div className="mb-4 flex items-center justify-between">
              <h2 id="settings-title" className="text-lg font-medium text-stone-100">
                Settings
              </h2>
              <button className="icon-button" type="button" onClick={() => setOpen(false)} aria-label="Close settings">
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-stone-200">Grounding Pause Duration</label>
                <p className="mt-1 mb-3 text-xs text-stone-400">How long to pause before journaling</p>
                <div className="space-y-2">
                  {[0, 3, 5, 10].map((duration) => (
                    <button
                      key={duration}
                      type="button"
                      onClick={() => handleChange({ resetDuration: duration as 0 | 3 | 5 | 10 })}
                      className={`w-full rounded-lg px-3 py-2 text-sm transition ${
                        settings.resetDuration === duration
                          ? 'border border-amber-500 bg-amber-500/20 text-amber-200'
                          : 'border border-stone-700 bg-stone-950/50 text-stone-300 hover:border-amber-500/50'
                      }`}
                    >
                      {duration === 0 ? 'Off' : `${duration} seconds`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-stone-800 pt-4">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-amber-500"
                    checked={settings.resetOnDateChange}
                    onChange={(e) => handleChange({ resetOnDateChange: e.target.checked })}
                  />
                  <span className="text-sm font-medium text-stone-200">Show pause when changing dates</span>
                </label>
              </div>

              <div>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-amber-500"
                    checked={settings.resetOnAppStart}
                    onChange={(e) => handleChange({ resetOnAppStart: e.target.checked })}
                  />
                  <span className="text-sm font-medium text-stone-200">Show pause on app start</span>
                </label>
              </div>
            </div>

            <button className="button-secondary mt-6 w-full justify-center" type="button" onClick={() => setOpen(false)}>
              Done
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
