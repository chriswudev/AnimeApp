import axios from 'axios';

export const getAnimes = async ({
  query,
  page,
}: {
  query?: string;
  page?: number;
}) => {
  const response = await axios.get(
    `https://api.jikan.moe/v4/anime?q=${query ?? ''}&page=${
      page ?? 1
    }&limit=20`,
  );
  return response.data;
};
