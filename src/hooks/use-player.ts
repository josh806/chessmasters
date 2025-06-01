import { useQuery } from '@tanstack/react-query';
import {
  getAllPlayers,
  getCountry,
  getPlayerById,
} from '../services/players.service';
import type { Player, Country } from '../types/player';

const useGetAllPlayers = (): {
  players: string[];
  isLoading: boolean;
  error: Error | null;
} => {
  const {
    data: players = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['allPlayers'],
    queryFn: getAllPlayers,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  return {
    players,
    isLoading,
    error,
  };
};

const useGetPlayer = (
  playerId: string
): {
  player: Player | undefined;
  isLoading: boolean;
  error: string;
} => {
  const {
    data: player,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['player', playerId],
    queryFn: () => getPlayerById(playerId),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  return {
    player,
    isLoading,
    error: error ? error.message : '',
  };
};

const useGetCountry = (
  countryUrl: string
): {
  countryData: Country | undefined;
  isLoading: boolean;
  error: string;
} => {
  const {
    data: countryData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['country', countryUrl],
    queryFn: () => getCountry(countryUrl),
    staleTime: Infinity,
    enabled: !!countryUrl,
  });

  return {
    countryData,
    isLoading,
    error: error ? error.message : '',
  };
};

export {
  type Player,
  type Country,
  useGetAllPlayers,
  useGetPlayer,
  useGetCountry,
};
