import { act } from 'react';
import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import useElapsedTimeSince from '../use-elapsed-time-since';

describe('useElapsedTimeSince', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('displays correct initial elapsed time', () => {
    const now = Math.floor(Date.now() / 1000);
    const fiveMinutesAgo = now - 5 * 60 - 7; // 5 min 7 sec ago

    const { result } = renderHook(() => useElapsedTimeSince(fiveMinutesAgo));

    expect(result.current).toBe('00:05:07');
  });

  it('updates timer correctly every second', () => {
    const now = Math.floor(Date.now() / 1000);
    const tenSecondsAgo = now - 10;

    const { result } = renderHook(() => useElapsedTimeSince(tenSecondsAgo));

    expect(result.current).toBe('00:00:10');

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current).toBe('00:00:13');
  });
});
