'use client';

import { useEffect, useState } from 'react';

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Listen for beforeinstallprompt event
    const handler = (e: Event) => {
      e.preventDefault(); // Prevent auto prompt
      setDeferredPrompt(e);
      setShowPrompt(true); // Show our custom button
    };

    const installedHandler = () => {
      setIsInstalled(true);
      setShowPrompt(false); // Hide if already installed
    };

    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', installedHandler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', installedHandler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt && 'prompt' in deferredPrompt) {
      // @ts-ignore: because Event type doesn't include prompt
      deferredPrompt.prompt();
      // @ts-ignore
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
        setShowPrompt(false);
      } else {
        console.log('User dismissed the install prompt');
      }
      setDeferredPrompt(null);
    }
  };

  if (isInstalled || !showPrompt) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg border px-4 py-2 rounded-md z-50">
      <p className="mb-2 text-sm font-medium">Install this app for a better experience!</p>
      <button
        onClick={handleInstallClick}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Install App
      </button>
    </div>
  );
}
