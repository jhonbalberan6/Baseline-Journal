import { Save, Sparkles } from 'lucide-react';
import type { EntryMode, RawMadLibData } from '../types';

const brainOptions = ['Foggy', 'Heavy', 'Numb', 'Peaceful', 'Restless'];
const focusOptions = ['Surviving', 'Distracted', 'Resting', 'Rebuilding'];

type ReflectionWorkspaceProps = {
  mode: EntryMode;
  text: string;
  madLib: RawMadLibData;
  saving: boolean;
  confirmation: string;
  onModeChange: (mode: EntryMode) => void;
  onTextChange: (text: string) => void;
  onMadLibChange: (madLib: RawMadLibData) => void;
  onSave: () => void;
};

export function ReflectionWorkspace({
  mode,
  text,
  madLib,
  saving,
  confirmation,
  onModeChange,
  onTextChange,
  onMadLibChange,
  onSave,
}: ReflectionWorkspaceProps) {
  const remaining = 500 - text.length;

  return (
    <section className="surface p-4 sm:p-5" aria-label="Reflection workspace">
      <div className="mb-5 grid grid-cols-2 gap-2 rounded-xl bg-stone-950/70 p-1">
        <button className={`segmented ${mode === 'standard' ? 'segmented-active' : ''}`} type="button" onClick={() => onModeChange('standard')}>
          Standard
        </button>
        <button className={`segmented ${mode === 'zero' ? 'segmented-active' : ''}`} type="button" onClick={() => onModeChange('zero')}>
          Zero-Energy
        </button>
      </div>

      {mode === 'standard' ? (
        <div>
          <label className="mb-3 block text-sm font-medium text-stone-200" htmlFor="journal-entry">
            Today, in a few honest lines
          </label>
          <textarea
            id="journal-entry"
            className="journal-textarea"
            maxLength={500}
            value={text}
            onChange={(event) => onTextChange(event.target.value)}
            placeholder="No performance. Just a trace of the day."
          />
          <div className="mt-3 flex items-center justify-between gap-3 text-sm">
            <span className={remaining < 40 ? 'text-amber-300' : 'text-stone-500'}>{remaining} characters left</span>
            <SaveStatus confirmation={confirmation} />
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <OptionGroup
            label="Brain state"
            options={brainOptions}
            value={madLib.brainState}
            onChange={(value) => onMadLibChange({ ...madLib, brainState: value })}
          />
          <OptionGroup
            label="Focus state"
            options={focusOptions}
            value={madLib.focusState}
            onChange={(value) => onMadLibChange({ ...madLib, focusState: value })}
          />
          <div>
            <label className="mb-2 block text-sm font-medium text-stone-200" htmlFor="grounding">
              One physical thing I can see/hear right now:
            </label>
            <input
              id="grounding"
              className="input-field"
              value={madLib.groundingSensation}
              onChange={(event) => onMadLibChange({ ...madLib, groundingSensation: event.target.value })}
              placeholder="rain, lamp, breath"
              maxLength={40}
            />
            <p className="mt-2 text-sm text-stone-500">One to three words is plenty.</p>
          </div>
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 font-serif text-lg leading-8 text-stone-200">
            {buildZeroEnergyEntry(madLib)}
          </div>
          <SaveStatus confirmation={confirmation} />
        </div>
      )}

      <button className="button-primary mt-6 w-full justify-center" type="button" onClick={onSave} disabled={saving || !canSave(mode, text, madLib)}>
        {saving ? <Sparkles className="animate-pulse" size={18} aria-hidden="true" /> : <Save size={18} aria-hidden="true" />}
        {saving ? 'Saving' : 'Save Entry'}
      </button>
    </section>
  );
}

export function buildZeroEnergyEntry(madLib: RawMadLibData): string {
  const brain = madLib.brainState || '...';
  const focus = madLib.focusState || '...';
  const grounding = madLib.groundingSensation.trim() || 'something nearby';
  return `Today my brain felt ${brain}. My main state was ${focus}. Physically, I can notice ${grounding}.`;
}

function canSave(mode: EntryMode, text: string, madLib: RawMadLibData): boolean {
  if (mode === 'standard') return text.trim().length > 0;
  return Boolean(madLib.brainState && madLib.focusState && madLib.groundingSensation.trim());
}

function OptionGroup({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (value: string) => void }) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-medium text-stone-200">{label}</legend>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {options.map((option) => (
          <button key={option} className={`choice ${value === option ? 'choice-active' : ''}`} type="button" onClick={() => onChange(option)}>
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function SaveStatus({ confirmation }: { confirmation: string }) {
  const isError = confirmation.startsWith('Error:');
  const displayText = isError ? confirmation.replace('Error: ', '') : confirmation;
  return <span className={`min-h-5 text-right text-sm ${isError ? 'text-red-300' : 'text-amber-300'}`}>{displayText}</span>;
}
