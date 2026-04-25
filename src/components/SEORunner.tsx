import { useEffect } from 'react';
import { subscribeToSiteSettings } from '../services/productService';

export default function SEORunner() {
  useEffect(() => {
    const unsubscribe = subscribeToSiteSettings((settings) => {
      if (settings.metaTitle) {
        document.title = settings.metaTitle;
      }
      
      const updateMeta = (name: string, content: string) => {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('name', name);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      };

      if (settings.metaDescription) {
        updateMeta('description', settings.metaDescription);
      }
      if (settings.metaKeywords) {
        updateMeta('keywords', settings.metaKeywords);
      }
    });
    return () => unsubscribe();
  }, []);

  return null;
}
