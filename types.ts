export type RootStackParamList = {
  Home: undefined;
  Details: {
    animeId: number;
  };
};

export type Anime = {
  mal_id: number;
  title: string;
};

export type AnimeDetails = {
  title: string;
  synopsis: string;
};
