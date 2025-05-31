import axios from 'axios';
import type { Player, Country } from '../types/player';

const urlGrandMasters = 'https://api.chess.com/pub/';

const getAllPlayers = async (): Promise<string[]> => {
  try {
    const res = await axios.get(`${urlGrandMasters}titled/GM`);
    return res.data.players;
  } catch (err) {
    console.log(`Error: ${JSON.stringify(err, null, 2)}`);
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 404) {
        throw new Error('Cannot load players. Please try again.');
      }
      throw new Error(`API error: ${err.message}`);
    }
    throw new Error('Unexpected error fetching players. Please try again');
  }
};

const getPlayerById = async (id: string): Promise<Player> => {
  try {
    const res = await axios.get(`${urlGrandMasters}player/${id}`);
    return res.data;
  } catch (err) {
    console.log(`Error: ${JSON.stringify(err, null, 2)}`);
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 404) {
        throw new Error(`No player found with username "${id}".`);
      }
      throw new Error(`API error: ${err.message}`);
    }
    throw new Error('Unexpected error fetching player. Please try again.');
  }
};

const getCountry = async (countryUrl: string): Promise<Country> => {
  try {
    const res = await axios.get(countryUrl);
    return res.data;
  } catch (err) {
    console.log(`Error: ${JSON.stringify(err, null, 2)}`);
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 404) {
        throw new Error(`No country found at "${countryUrl}".`);
      }
      throw new Error(`API error: ${err.message}`);
    }
    throw new Error('Unexpected error fetching country. Please try again.');
  }
};

export { getAllPlayers, getPlayerById, getCountry };
