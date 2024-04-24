import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RouteProp} from '@react-navigation/native';
import {useAnimes} from '../hooks/animes';
import {useFavorites} from '../hooks/favorites';
import Loading from '../components/Loading';
import {RootStackParamList} from '../types';
import {Screen} from '../enums';

type AnimeDetailsScreenProps = {
  route: RouteProp<RootStackParamList, Screen.Details>;
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{animeDetails.title}</Text>
        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={handleToggleFavorite}>
          <Icon
            name={isFavorited ? 'favorite' : 'favorite-border'}
            size={30}
            color="red"
          />
        </TouchableOpacity>
      </View>
      <Image
        source={{uri: animeDetails.images.jpg.image_url}}
        style={styles.image}
      />
      <Text>{animeDetails.synopsis}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
    width: '80%',
  },
  iconWrapper: {
    alignItems: 'flex-end',
    width: '20%',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    backgroundColor: '#EEE',
    marginVertical: 20,
  },
});

export default AnimeDetailsScreen;
