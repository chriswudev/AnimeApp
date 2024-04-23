import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RouteProp} from '@react-navigation/native';
import {useAnimes} from '../hooks/animes';
import {useFavorites} from '../hooks/favorites';
import Loading from '../components/Loading';
import {RootStackParamList} from '../types';

type AnimeDetailsScreenProps = {
  route: RouteProp<RootStackParamList, 'Details'>;
};

const AnimeDetailsScreen: React.FC<AnimeDetailsScreenProps> = ({route}) => {
  const {animeId} = route.params;
  const {animes} = useAnimes();
  const {favorites, toggleFavorite} = useFavorites();

  const animeDetails = animes.find(anime => anime.mal_id === animeId);
  const isFavorited = favorites.includes(animeId);

  const handleToggleFavorite = () => {
    toggleFavorite(animeId);
  };

  if (!animeDetails) {
    return <Loading visible />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{animeDetails.title}</Text>
      <Text>{animeDetails.synopsis}</Text>
      <TouchableOpacity onPress={handleToggleFavorite}>
        <Icon
          name={isFavorited ? 'favorite' : 'favorite-border'}
          size={30}
          color="red"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AnimeDetailsScreen;
