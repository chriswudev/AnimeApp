import {useEffect} from 'react';
import {useSelector, useDispatch, TypedUseSelectorHook} from 'react-redux';
import {RootState, AppDispatch} from '../app/store';
import {
  fetchFavorites,
  toggleFavorite,
} from '../features/favorites/favoritesSlice';

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useFavorites = () => {
  const dispatch = useAppDispatch();
  const {favorites, status, error} = useAppSelector(
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
    status,
    error,
    fetchFavorites: dispatchFetchFavorites,
    toggleFavorite: displatchToggleFavorite,
  };
};
