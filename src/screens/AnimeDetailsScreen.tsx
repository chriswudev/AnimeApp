import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import axios from 'axios';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList, AnimeDetails} from '../types';

type AnimeDetailsScreenProps = {
  route: RouteProp<RootStackParamList, 'Details'>;
};

const AnimeDetailsScreen: React.FC<AnimeDetailsScreenProps> = ({route}) => {
  const {animeId} = route.params;
  const [animeDetails, setAnimeDetails] = useState<AnimeDetails | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get<{data: AnimeDetails}>(
          `https://api.jikan.moe/v4/anime/${animeId}`,
        );
        setAnimeDetails(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetails();
  }, [animeId]);

  if (!animeDetails) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{animeDetails.title}</Text>
      <Text>{animeDetails.synopsis}</Text>
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
