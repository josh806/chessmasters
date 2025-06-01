import { useEffect, useState } from 'react';

const useElapsedTimeSince = (unixTimestamp?: number): string => {
  const [elapsed, setElapsed] = useState('');

  useEffect(() => {
    if (!unixTimestamp) return;

    const updateElapsed = () => {
      const seconds = Math.floor(Date.now() / 1000) - unixTimestamp;
      const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
      const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
      const secs = String(seconds % 60).padStart(2, '0');
      setElapsed(`${hrs}:${mins}:${secs}`);
    };

    updateElapsed(); // run immediately
    const interval = setInterval(updateElapsed, 1000);
    return () => clearInterval(interval);
  }, [unixTimestamp]);

  return elapsed;
};

export default useElapsedTimeSince;
