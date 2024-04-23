import {useEffect, useRef} from 'react';
import {useSelector, useDispatch, TypedUseSelectorHook} from 'react-redux';
import debounce from 'lodash.debounce';
import {RootState, AppDispatch} from '../app/store';
import {fetchAnimes} from '../features/animes/animesSlice';

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAnimes = () => {
  const dispatch = useAppDispatch();
  const {animes, status, error, page, hasMore} = useAppSelector(
    (state: RootState) => state.animes,
  );

  // useRef to store the debounced function
  const debouncedSearchRef = useRef<ReturnType<typeof debounce> | null>(null);

  if (!debouncedSearchRef.current) {
    // Initialize the debounced function
    debouncedSearchRef.current = debounce(query => {
      dispatch(fetchAnimes(query));
    }, 500);
  }

  useEffect(() => {
    // Cleanup the debounced function on unmount
    return () => {
      if (debouncedSearchRef.current) {
        debouncedSearchRef.current.cancel();
      }
    };
  }, []);

  return {
    animes,
    status,
    error,
    page,
    hasMore,
    debouncedSearch: debouncedSearchRef.current,
  };
};
