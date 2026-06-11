export function isStandaloneMode(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    ('standalone' in window.navigator && Boolean((window.navigator as Navigator & { standalone?: boolean }).standalone))
  );
}

export function isIosSafari(): boolean {
  const navigatorWithStandalone = window.navigator as Navigator & { standalone?: boolean };
  const isiOS = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
  return isiOS && navigatorWithStandalone.standalone !== true;
}
