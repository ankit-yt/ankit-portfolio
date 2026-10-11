import { useEffect, useState } from 'react';

let visitRequest;
function recordVisit() {
  // Share a single request across React StrictMode effect replays.
  if (!visitRequest) {
    visitRequest = fetch('/api/visits', {
      method: 'POST', credentials: 'same-origin', cache: 'no-store',
      signal: AbortSignal.timeout(10000),
    }).then(async response => {
      if (!response.ok) throw new Error('Counter unavailable');
      const data = await response.json();
      if (!Number.isSafeInteger(data.total) || data.total < 0) throw new Error('Invalid total');
      return data.total;
    });
  }
  return visitRequest;
}

export default function VisitCounter() {
  const [total, setTotal] = useState(null);
  useEffect(() => {
    let mounted = true;
    recordVisit().then(value => { if (mounted) setTotal(value); }).catch(() => {});
    return () => { mounted = false; };
  }, []);
  if (total === null) return null;
  return <span className="visit-counter" title="Approximate visits. One count per browser every 24 hours.">
    <span className="visit-counter-dot" aria-hidden="true" />
    <strong>{total.toLocaleString()}</strong> portfolio visits
  </span>;
}
