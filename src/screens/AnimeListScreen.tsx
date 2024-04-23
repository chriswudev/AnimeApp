import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StackNavigationProp} from '@react-navigation/stack';
import {useAnimes} from '../hooks/animes';
import {useFavorites} from '../hooks/favorites';
import Loading from '../components/Loading';
import {RootStackParamList} from '../types';

type AnimeListScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'List'>;
};

const AnimeListScreen: React.FC<AnimeListScreenProps> = ({navigation}) => {
  const {animes, hasMore, page, status, debouncedSearch} = useAnimes();
  const {favorites} = useFavorites();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const handleLoadMore = () => {
    if (hasMore && status !== 'loadingMore') {
      debouncedSearch({query: searchQuery, page: page + 1});
    }
  };

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  if (status === 'loading') {
    return <Loading visible />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={handleSearch}
        value={searchQuery}
        placeholder="Search Anime"
      />
      <FlatList
        data={animes}
        keyExtractor={item => item.mal_id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Details', {animeId: item.mal_id})
            }>
            <Text
              style={[
                styles.listItem,
                favorites.includes(item.mal_id) ? styles.favorited : undefined,
              ]}>
              {item.title}
            </Text>
            <Icon
              name={
                favorites.includes(item.mal_id) ? 'favorite' : 'favorite-border'
              }
              size={24}
              color="red"
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
        onEndReached={handleLoadMore}
        ListFooterComponent={<Loading visible={status === 'loadingMore'} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  listItem: {
    padding: 10,
    fontSize: 18,
  },
  favorited: {
    color: 'red',
  },
  icon: {
    marginLeft: 10,
  },
});

export default AnimeListScreen;
