import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import renderWithQueryClient from './render-with-query-client';
import PlayersList from '../components/players-list';
import PlayerProfile from '../components/player-profile';

vi.mock('axios');
vi.mock('react-virtualized-auto-sizer', () => ({
  default: ({
    children,
  }: {
    children: (size: { height: number; width: number }) => React.ReactNode;
  }) => children({ height: 600, width: 1000 }),
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

mockedAxios.get.mockImplementation((url) => {
  if (url.includes('/titled/GM')) {
    return Promise.resolve({ data: { players: ['magnuscarlsen'] } });
  }
  if (url.includes('/player/magnuscarlsen')) {
    return Promise.resolve({
      data: {
        username: 'magnuscarlsen',
        status: 'premium',
        last_online: 1700000000,
        joined: 1600000000,
        country: 'https://api.chess.com/pub/country/NO',
      },
    });
  }

  return Promise.reject(new Error(`Unhandled URL: ${url}`));
});

describe('Players integration test', () => {
  it('navigates to and load player profile', async () => {
    const user = userEvent.setup();

    renderWithQueryClient(
      <Routes>
        <Route path="/" element={<PlayersList />} />
        <Route path="/player/:username" element={<PlayerProfile />} />
      </Routes>
    );

    await waitFor(() => {
      const player = screen.getByText('magnuscarlsen');
      user.click(player);
      expect(screen.getByTestId('username')).toHaveTextContent('magnuscarlsen');
    });
  });
});
