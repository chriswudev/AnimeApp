import axios from 'axios';
import {AnimeQuery} from '../../types';

export const getAnimes = async ({query = '', page = 1}: AnimeQuery) => {
  const response = await axios.get(
    `https://api.jikan.moe/v4/anime?q=${query}&page=${page}&limit=20`,
  );
  return response.data;
};
