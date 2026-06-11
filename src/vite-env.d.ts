/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

declare module 'html2pdf.js' {
  const html2pdf: () => {
    set: (options: unknown) => ReturnType<typeof html2pdf>;
    from: (source: HTMLElement) => ReturnType<typeof html2pdf>;
    save: () => Promise<void>;
  };
  export default html2pdf;
}
