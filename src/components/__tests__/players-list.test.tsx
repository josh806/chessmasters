import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import axios from 'axios';
import PlayersList from '../players-list';
import renderWithQueryClient from '../../__tests__/render-with-query-client';

vi.mock('axios');
vi.mock('react-virtualized-auto-sizer', () => ({
  default: ({
    children,
  }: {
    children: (size: { height: number; width: number }) => React.ReactNode;
  }) => children({ height: 600, width: 1000 }),
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

const renderPlayerList = () => renderWithQueryClient(<PlayersList />);

describe('PlayersList', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders loading state while fetching players', async () => {
    mockedAxios.get.mockImplementation(() => new Promise(() => {}));

    renderPlayerList();

    await waitFor(() => {
      expect(screen.getByText(/Loading.../)).toBeInTheDocument();
    });
  });

  it('renders player list after successful fetch', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { players: ['magnuscarlsen', 'hikaru'] },
    });

    renderPlayerList();

    await waitFor(() => {
      expect(screen.getByText('magnuscarlsen')).toBeInTheDocument();
      expect(screen.getByText('hikaru')).toBeInTheDocument();
    });
  });

  it('shows empty message if no players are returned', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { players: [] } });

    renderPlayerList();

    await waitFor(() => {
      expect(screen.getByText(/no players/i)).toBeInTheDocument();
    });
  });

  it('shows error message if players API fails', async () => {
    mockedAxios.get.mockRejectedValueOnce({
      response: { status: 500 },
    });

    renderPlayerList();

    await waitFor(() => {
      expect(
        screen.getByText(/Unexpected error fetching players/i)
      ).toBeInTheDocument();
    });
  });
});
