import { useEffect } from 'react';

/**
 * Lightweight injector for Vercel Web Analytics script.
 *
 * Usage:
 *  - Add an environment variable named `VITE_VERCEL_ANALYTICS_ID` in Vercel
 *    (or in a local .env) with the Analytics project ID from the Vercel dashboard.
 *  - The component will inject the analytics script when the env var is present.
 *
 * Note: You still need to enable Vercel Analytics for your project in the Vercel
 * dashboard and use the ID provided there. This component only injects the
 * script tag into the page.
 */

const VercelAnalytics: React.FC = () => {
  useEffect(() => {
    const id = import.meta.env.VITE_VERCEL_ANALYTICS_ID as string | undefined;
    if (!id) return;

    // Avoid injecting twice
    if (document.querySelector(`script[data-vercel-analytics-id="${id}"]`)) return;

    const script = document.createElement('script');
    script.setAttribute('data-vercel-analytics-id', id);
    script.defer = true;
    // NOTE: Use Vercel's analytics script host. If your Vercel dashboard gives
    // a different snippet, replace the src accordingly. This URL is the
    // commonly used host for analytics snippets; if it changes, update it.
    script.src = `https://analytics.vercel-insights.com/script.js`;
    document.head.appendChild(script);

    return () => {
      try {
        document.head.removeChild(script);
      } catch (e) {
        // ignore
      }
    };
  }, []);

  return null;
};

export default VercelAnalytics;
