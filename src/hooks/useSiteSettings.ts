import { useState, useEffect } from 'react';
import { SiteSettings, subscribeToSiteSettings } from '../services/productService';

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToSiteSettings((data) => {
      setSettings(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { settings, loading };
}
