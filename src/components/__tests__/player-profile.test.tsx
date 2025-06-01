import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import axios from 'axios';
import PlayerProfile from '../player-profile';
import renderWithQueryClient from '../../__tests__/render-with-query-client';

const mockedPlayer = {
  username: 'magnuscarlsen',
  status: 'premium',
  last_online: Math.floor(Date.now() / 1000) - 100,
  joined: 1700000000,
  country: 'https://api.chess.com/pub/country/NO',
};
const mockedCountry = { name: 'Norway', code: 'NO' };

vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useParams: () => ({ username: mockedPlayer.username }),
  };
});

const renderPlayerProfile = () => renderWithQueryClient(<PlayerProfile />);

describe('PlayerProfile', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('shows loading state while fetching profile data', async () => {
    mockedAxios.get.mockImplementation(() => new Promise(() => {}));

    renderPlayerProfile();
    expect(screen.getByText(/loading profile/i)).toBeInTheDocument();
  });

  it('displays player details after successful fetch', async () => {
    mockedAxios.get.mockImplementation((url) => {
      if (url.includes('/player/magnuscarlsen')) {
        return Promise.resolve({ data: mockedPlayer });
      }
      if (url.includes('/country/NO')) {
        return Promise.resolve({ data: mockedCountry });
      }
      return Promise.reject(new Error('Unknown endpoint'));
    });

    renderPlayerProfile();

    await waitFor(() => {
      expect(screen.getByTestId('username')).toBeInTheDocument();
      expect(screen.getByTestId('country')).toHaveTextContent(
        'Country: Norway'
      );
      expect(screen.getByTestId('status')).toHaveTextContent('Status: premium');
    });
  });

  it('handles profile fetch failure gracefully', async () => {
    mockedAxios.get.mockRejectedValueOnce({
      response: { status: 500 },
    });

    renderPlayerProfile();

    await waitFor(() => {
      expect(
        screen.getByText(/Unexpected error fetching player/i)
      ).toBeInTheDocument();
    });
  });

  it('shows "Unknown" when country fetch fails', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        ...mockedPlayer,
        country: 'https://api.chess.com/pub/country/XX',
      },
    });

    renderPlayerProfile();

    await waitFor(() => {
      expect(screen.getByTestId('country')).toHaveTextContent(
        'Country: Unknown'
      );
    });
  });

  it('shows "Unknown" when player missing country', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { country, ...rest } = mockedPlayer;
    mockedAxios.get.mockResolvedValueOnce({
      data: { ...rest },
    });

    renderPlayerProfile();

    await waitFor(() => {
      expect(screen.getByTestId('country')).toHaveTextContent(
        'Country: Unknown'
      );
    });
  });
});
