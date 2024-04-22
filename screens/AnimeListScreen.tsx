import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import axios from 'axios';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList, Anime} from '../types';

type AnimeListScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const AnimeListScreen: React.FC<AnimeListScreenProps> = ({navigation}) => {
  const [animes, setAnimes] = useState<Anime[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{data: Anime[]}>(
          'https://api.jikan.moe/v4/anime',
        );
        setAnimes(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={animes}
        keyExtractor={item => item.mal_id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Details', {animeId: item.mal_id})
            }>
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AnimeListScreen;
