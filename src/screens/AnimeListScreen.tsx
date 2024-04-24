import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import debounce from 'lodash.debounce';
import {useAnimes} from '../hooks/animes';
import {useFavorites} from '../hooks/favorites';
import Loading from '../components/Loading';
import Searchbar from '../components/Searchbar';
import ListItem from '../components/ListItem';
import {RootStackParamList} from '../types';
import {Screen, AnimeApiStatus} from '../enums';

type AnimeListScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, Screen.List>;
};

const AnimeListScreen: React.FC<AnimeListScreenProps> = ({navigation}) => {
  const {animes, hasMore, page, status, search} = useAnimes();
  const {favorites, toggleFavorite} = useFavorites();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = debounce((text: string) => {
    setSearchQuery(text);
  }, 500);

  const handleLoadMore = () => {
    if (hasMore && status !== AnimeApiStatus.LoadingMore) {
      search({query: searchQuery, page: page + 1});
    }
  };

  useEffect(() => {
    search({query: searchQuery, page: 1});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <Searchbar onChangeText={handleSearch} placeholder="Search Anime" />
      {status === AnimeApiStatus.Loading && animes.length === 0 ? (
        <Loading visible />
      ) : (
        <FlatList
          data={animes}
          keyExtractor={item => item.mal_id.toString()}
          renderItem={({item}) => (
            <ListItem
              title={item.title}
              key={item.mal_id}
              isFavorited={favorites.includes(item.mal_id)}
              imageUrl={item.images.jpg.small_image_url}
              onItemPress={() =>
                navigation.navigate(Screen.Details, {animeId: item.mal_id})
              }
              onToggleFavorite={() => toggleFavorite(item.mal_id)}
            />
          )}
          onEndReached={handleLoadMore}
          ListFooterComponent={
            <Loading visible={status === AnimeApiStatus.LoadingMore} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
});

export default AnimeListScreen;
