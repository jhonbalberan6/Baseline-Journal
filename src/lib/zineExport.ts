import type { DailyLog } from '../types';
import { compactDateRange, formatDateKey } from './dates';

export async function exportZinePdf(logs: DailyLog[]): Promise<void> {
  const { default: html2pdf } = await import('html2pdf.js');
  const ordered = [...logs].sort((a, b) => a.date.localeCompare(b.date));
  const wrapper = document.createElement('div');
  wrapper.style.position = 'fixed';
  wrapper.style.left = '-10000px';
  wrapper.style.top = '0';
  wrapper.innerHTML = buildZineMarkup(ordered);
  document.body.appendChild(wrapper);

  try {
    await html2pdf()
      .set({
        margin: 0,
        filename: `baseline-zine-${new Date().toISOString().slice(0, 10)}.pdf`,
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      })
      .from(wrapper)
      .save();
  } finally {
    wrapper.remove();
  }
}

function buildZineMarkup(logs: DailyLog[]): string {
  const start = logs.at(0)?.date;
  const end = logs.at(-1)?.date;
  const entries = logs.map(buildEntryMarkup).join('');

  return `
    <article style="width: 8.5in; color: #1c1917; background: #fafaf9; font-family: Georgia, 'Times New Roman', serif;">
      <section style="height: 11in; padding: 1.2in 0.85in; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; page-break-after: always;">
        <p style="font: 12px Arial, sans-serif; letter-spacing: 3px; color: #92400e; margin: 0 0 28px;">PRIVATE LOCAL JOURNAL</p>
        <h1 style="font-size: 58px; line-height: 1; margin: 0 0 36px; font-weight: normal;">BASELINE ZINE</h1>
        <p style="font-size: 19px; line-height: 1.65; margin: 0;">${logs.length} logged ${logs.length === 1 ? 'day' : 'days'}</p>
        <p style="font-size: 19px; line-height: 1.65; margin: 0;">${compactDateRange(start, end)}</p>
      </section>
      ${entries}
    </article>
  `;
}

function buildEntryMarkup(log: DailyLog): string {
  const image = log.proofImageBase64
    ? `<img src="${log.proofImageBase64}" alt="" style="display: block; max-width: 4.9in; max-height: 4in; object-fit: contain; margin: 42px auto 0; border-radius: 6px;" />`
    : '';

  return `
    <section style="min-height: 11in; padding: 0.95in 0.85in; box-sizing: border-box; page-break-after: always;">
      <p style="font: 12px Arial, sans-serif; letter-spacing: 2px; color: #a16207; margin: 0 0 28px;">${log.isZeroEnergy ? 'ZERO-ENERGY ENTRY' : 'DAILY ENTRY'}</p>
      <h2 style="font-size: 28px; font-weight: normal; margin: 0 0 34px;">${escapeHtml(formatDateKey(log.date))}</h2>
      <p style="font-size: 23px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${escapeHtml(log.journalEntry)}</p>
      ${image}
    </section>
  `;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
