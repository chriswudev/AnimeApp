import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {AnimePayload, AnimeState} from '../../types';
import {getAnimes} from './animesApi';
import {uniqueArray} from '../../utils/array';

const initialState: AnimeState = {
  animes: [],
  status: 'idle',
  error: null,
  page: 1,
  hasMore: true,
};

// Asynchronous thunk action
export const fetchAnimes = createAsyncThunk(
  'animes/fetchAnimes',
  async (
    {query, page}: {query: string | undefined; page: number | undefined},
    {rejectWithValue},
  ) => {
    try {
      return await getAnimes({query, page});
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
);

const animeSlice = createSlice({
  name: 'animes',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAnimes.pending, state => {
        state.status = state.page === 1 ? 'loading' : 'loadingMore';
      })
      .addCase(
        fetchAnimes.fulfilled,
        (state, action: PayloadAction<AnimePayload>) => {
          state.animes =
            state.page === 1
              ? action.payload.data
              : uniqueArray(
                  [...state.animes, ...action.payload.data],
                  'mal_id',
                );
          state.status = 'succeeded';
          state.page += 1;
          state.hasMore = action.payload.pagination.has_next_page;
        },
      )
      .addCase(fetchAnimes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default animeSlice.reducer;
