import { useEffect, useState } from 'react';

const updateElapsed = (unixTimestamp: number) => {
  const seconds = Math.floor(Date.now() / 1000) - unixTimestamp;
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
};

const useElapsedTimeSince = (unixTimestamp?: number): string => {
  const [elapsed, setElapsed] = useState('');

  useEffect(() => {
    if (!unixTimestamp) return;

    setElapsed(updateElapsed(unixTimestamp));
    const interval = setInterval(
      () => setElapsed(updateElapsed(unixTimestamp)),
      1000
    );
    return () => clearInterval(interval);
  }, [unixTimestamp]);

  return elapsed;
};

export default useElapsedTimeSince;
