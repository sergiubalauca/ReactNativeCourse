import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Film } from '@/types/interfaces';
import { colors } from '@/constants/colors';

const FilmDetails = () => {
  const { id } = useLocalSearchParams();
  const [film, setFilm] = useState<Film | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/films/${id}`);
        const data = await response.json();
        setFilm(data);
      } catch (error) {
        console.error('Error fetching film:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFilm();
  }, [id]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!film) {
    return <Text>Film not found</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
