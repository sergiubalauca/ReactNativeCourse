import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Film } from '@/types/interfaces';
import { colors } from '@/constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FAVORITES_KEY } from '@/constants/store-keys';

const FilmDetails = () => {
  const { id } = useLocalSearchParams();
  const [film, setFilm] = useState<Film | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/films/${id}`);
        const data = await response.json();
        setFilm(data);

        setIsFavorite((await checkFavoriteStatus(data)) ?? false);
      } catch (error) {
        console.error('Error fetching film:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilm();
  }, [id]);

  const checkFavoriteStatus = async (film: Film) => {
    try {
      const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
      const parsedFavorites = favorites
        ? (JSON.parse(favorites) as Array<Film>)
        : [];
      return parsedFavorites.some(
        (fav: Film) => fav.episode_id === film.episode_id
      );
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
      const parsedFavorites = favorites
        ? (JSON.parse(favorites) as Array<Film>)
        : [];
      const updatedFavorites = isFavorite
        ? parsedFavorites.filter((fav) => fav.episode_id !== film?.episode_id)
        : [...parsedFavorites, film];
      await AsyncStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(updatedFavorites)
      );
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!film) {
    return <Text>Film not found</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => {
            return (
              <TouchableOpacity onPress={toggleFavorite}>
                <Ionicons
                  name={isFavorite ? 'heart' : 'heart-outline'}
                  size={24}
                  color={isFavorite ? colors.text : colors.inactive}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Text style={styles.title}>{film?.title}</Text>
      <Text style={styles.detail}>Episode: {film?.episode_id}</Text>
      <Text style={styles.detail}>Director: {film?.director}</Text>
      <Text style={styles.detail}>Producer: {film?.producer}</Text>
      <Text style={styles.detail}>Release Date: {film?.release_date}</Text>
      <Text style={styles.crawl}>{film?.opening_crawl}</Text>
    </ScrollView>
  );
};

export default FilmDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.containerBackground,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  detail: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 8,
  },
  crawl: {
    fontSize: 14,
    fontStyle: 'italic',
    color: colors.text,
    marginTop: 16,
  },
});
