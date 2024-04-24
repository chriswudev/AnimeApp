import {RootState} from '../app/store';
import {fetchAnimes} from '../features/animes/animesSlice';
import {useAppDispatch, useAppSelector} from './app';
import {AnimeQuery} from '../types';

export const useAnimes = () => {
  const dispatch = useAppDispatch();
  const {animes, status, error, page, hasMore} = useAppSelector(
    (state: RootState) => state.animes,
  );

  const search = (query: AnimeQuery) => {
    dispatch(fetchAnimes(query));
  };

  return {
    animes,
    status,
    error,
    page,
    hasMore,
    search,
  };
};
