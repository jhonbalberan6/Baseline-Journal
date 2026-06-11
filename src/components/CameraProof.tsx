import { Camera, ImageOff, RefreshCw, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { compressImageToBase64 } from '../lib/imageCompression';

type CameraProofProps = {
  imageBase64: string | null;
  onChange: (imageBase64: string | null) => void;
};

export function CameraProof({ imageBase64, onChange }: CameraProofProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function handleFile(file?: File) {
    if (!file) return;
    setBusy(true);
    setError('');
    try {
      onChange(await compressImageToBase64(file));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'That image could not be processed.';
      setError(message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="surface p-4" aria-label="Photo proof">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-medium text-stone-100">Photo Proof</h2>
          <p className="mt-1 text-sm text-stone-400">Optional, local, compressed on this device.</p>
        </div>
        <input
          ref={inputRef}
          className="sr-only"
          type="file"
          accept="image/*"
          capture="environment"
          onChange={(event) => void handleFile(event.target.files?.[0])}
        />
        <button className="icon-button" type="button" onClick={() => inputRef.current?.click()} aria-label={imageBase64 ? 'Replace image' : 'Add image'}>
          {imageBase64 ? <RefreshCw size={18} aria-hidden="true" /> : <Camera size={18} aria-hidden="true" />}
        </button>
      </div>

      {imageBase64 ? (
        <div className="overflow-hidden rounded-lg border border-stone-700/80 bg-stone-950">
          <img className="max-h-80 w-full object-contain" src={imageBase64} alt="Selected journal proof" />
          <div className="flex border-t border-stone-800">
            <button className="proof-action" type="button" onClick={() => inputRef.current?.click()}>
              <RefreshCw size={16} aria-hidden="true" />
              Replace
            </button>
            <button className="proof-action text-red-200 hover:text-red-100" type="button" onClick={() => onChange(null)}>
              <X size={16} aria-hidden="true" />
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button className="empty-proof" type="button" onClick={() => inputRef.current?.click()}>
          <ImageOff size={22} aria-hidden="true" />
          <span>{busy ? 'Preparing image...' : 'Add a quiet proof of today'}</span>
        </button>
      )}

      {error ? <p className="mt-3 text-sm text-red-300">{error}</p> : null}
    </section>
  );
}
