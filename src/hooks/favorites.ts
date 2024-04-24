import {useEffect} from 'react';
import {RootState} from '../app/store';
import {
  fetchFavorites,
  toggleFavorite,
} from '../features/favorites/favoritesSlice';
import {useAppDispatch, useAppSelector} from './app';

export const useFavorites = () => {
  const dispatch = useAppDispatch();
  const {favorites, error} = useAppSelector(
    (state: RootState) => state.favorites,
  );

  const dispatchFetchFavorites = () => {
    dispatch(fetchFavorites());
  };

  const displatchToggleFavorite = (animeId: number) => {
    dispatch(toggleFavorite(animeId));
  };

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  return {
    favorites,
    error,
    fetchFavorites: dispatchFetchFavorites,
    toggleFavorite: displatchToggleFavorite,
  };
};
