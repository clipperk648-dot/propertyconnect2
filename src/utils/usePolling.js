import { useEffect, useRef } from 'react';

export default function usePolling(callback, intervalMs = 5000, deps = []) {
  const savedCb = useRef(callback);
  useEffect(() => { savedCb.current = callback; }, [callback]);

  useEffect(() => {
    let stopped = false;
    let timer = null;

    const tick = async () => {
      try { await savedCb.current?.(); } catch {}
      if (!stopped) timer = setTimeout(tick, intervalMs);
    };

    // initial immediate call
    tick();

    return () => {
      stopped = true;
      if (timer) clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intervalMs, ...deps]);
}
