import {AnimeApiStatus} from './enums';

export type RootStackParamList = {
  Onboarding: undefined;
  List: undefined;
  Details: {
    animeId: number;
  };
};

export type AnimePagination = {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
};

export type Anime = {
  mal_id: number;
  title: string;
  synopsis: string;
  images: {jpg: {image_url: string; small_image_url: string}};
};

export type AnimeQuery = {
  query?: string;
  page?: number;
};

export type AnimePayload = {
  pagination: AnimePagination;
  data: Anime[];
};

export type AnimeState = {
  animes: Anime[];
  status: AnimeApiStatus;
  error: string | null;
  page: number;
  hasMore: boolean;
};

export type AnimeDetails = {
  title: string;
  synopsis: string;
};
