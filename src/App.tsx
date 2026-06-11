import { useCallback, useEffect, useState } from 'react';
import { AppShell } from './components/AppShell';
import { CalendarView } from './components/CalendarView';
import { CameraProof } from './components/CameraProof';
import { HistoryView } from './components/HistoryView';
import { ImpulseReset } from './components/ImpulseReset';
import { InstallPrompt } from './components/InstallPrompt';
import { ResetCeremony } from './components/ResetCeremony';
import { buildZeroEnergyEntry, ReflectionWorkspace } from './components/ReflectionWorkspace';
import { SettingsPanel } from './components/SettingsPanel';
import { ZineExport } from './components/ZineExport';
import { clearDailyLogs, getAllDailyLogs, getDailyLog, saveDailyLog } from './lib/db';
import { readSettings } from './lib/settings';
import { todayKey } from './lib/dates';
import { readBaselineStats, recordSuccessfulSave, resetBaselineStats, type BaselineStats } from './lib/streaks';
import type { DailyLog, EntryMode, RawMadLibData } from './types';
import { registerSW } from 'virtual:pwa-register';

const emptyMadLib: RawMadLibData = {
  brainState: '',
  focusState: '',
  groundingSensation: '',
};

registerSW({ immediate: true });

export default function App() {
  const [selectedDate, setSelectedDate] = useState(todayKey());
  const [mode, setMode] = useState<EntryMode>('standard');
  const [text, setText] = useState('');
  const [madLib, setMadLib] = useState<RawMadLibData>(emptyMadLib);
  const [proofImageBase64, setProofImageBase64] = useState<string | null>(null);
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [stats, setStats] = useState<BaselineStats>(() => readBaselineStats());
  const [saving, setSaving] = useState(false);
  const [confirmation, setConfirmation] = useState('');
  const [resetVisible, setResetVisible] = useState(false);

  const refreshLogs = useCallback(async () => {
    setLogs(await getAllDailyLogs());
  }, []);

  useEffect(() => {
    void refreshLogs();
    // Only show reset on app start if configured
    const settings = readSettings();
    if (settings.resetOnAppStart) {
      setResetVisible(true);
    }
  }, [refreshLogs]);

  useEffect(() => {
    let cancelled = false;

    async function loadSelectedLog() {
      const log = await getDailyLog(selectedDate);
      if (cancelled) return;

      setConfirmation('');
      if (!log) {
        setMode('standard');
        setText('');
        setMadLib(emptyMadLib);
        setProofImageBase64(null);
        return;
      }

      setMode(log.isZeroEnergy ? 'zero' : 'standard');
      setText(log.isZeroEnergy ? '' : log.journalEntry.slice(0, 500));
      setMadLib(log.rawMadLibData ?? emptyMadLib);
      setProofImageBase64(log.proofImageBase64);
    }

    void loadSelectedLog();
    return () => {
      cancelled = true;
    };
  }, [selectedDate]);

  function handleDateChange(date: string) {
    if (date === selectedDate) return;
    setSelectedDate(date);
    
    const settings = readSettings();
    if (settings.resetOnDateChange) {
      setResetVisible(true);
    }
  }

  function handleModeChange(newMode: EntryMode) {
    setMode(newMode);
    setText('');
    setMadLib(emptyMadLib);
  }

  async function handleSave() {
    setSaving(true);
    setConfirmation('');
    const journalEntry = mode === 'zero' ? buildZeroEnergyEntry(madLib) : text.trim();
    const log: DailyLog = {
      date: selectedDate,
      journalEntry,
      isZeroEnergy: mode === 'zero',
      rawMadLibData: mode === 'zero' ? madLib : undefined,
      proofImageBase64,
    };

    try {
      await saveDailyLog(log);
      setStats(recordSuccessfulSave());
      await refreshLogs();
      setConfirmation('Saved');
      window.setTimeout(() => setConfirmation(''), 3500);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Could not save entry.';
      setConfirmation(`Error: ${message}`);
      window.setTimeout(() => setConfirmation(''), 5000);
    } finally {
      setSaving(false);
    }
  }

  async function handleReset() {
    await clearDailyLogs();
    setStats(resetBaselineStats());
    setSelectedDate(todayKey());
    setMode('standard');
    setText('');
    setMadLib(emptyMadLib);
    setProofImageBase64(null);
    await refreshLogs();
  }

  return (
    <AppShell stats={stats}>
      <SettingsPanel />
      <ImpulseReset visible={resetVisible} onComplete={() => setResetVisible(false)} />
      <CalendarView selectedDate={selectedDate} logs={logs} onDateSelect={handleDateChange} />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <div className="space-y-5">
          <ReflectionWorkspace
            mode={mode}
            text={text}
            madLib={madLib}
            saving={saving}
            confirmation={confirmation}
            onModeChange={handleModeChange}
            onTextChange={setText}
            onMadLibChange={setMadLib}
            onSave={() => void handleSave()}
          />
          <CameraProof imageBase64={proofImageBase64} onChange={setProofImageBase64} />
          <HistoryView logs={logs} />
        </div>

        <aside className="space-y-5">
          <InstallPrompt />
          <ZineExport logs={logs} />
          <ResetCeremony onReset={handleReset} />
        </aside>
      </div>
    </AppShell>
  );
}
