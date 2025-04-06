import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Person } from '@/types/interfaces';
import { colors } from '@/constants/colors';
const PersonDetails = () => {
  const { id } = useLocalSearchParams();
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPerson = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://swapi.dev/api/people/${id}`);
        const data = await response.json();
        setPerson(data);
        console.log('GSB data', id, data);
      } catch (error) {
        console.error('Error fetching person:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerson();
  }, [id]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!person) {
    return <Text>Person not found</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.name}>{person.name}</Text>
      <Text style={styles.detail}>Height: {person.height}</Text>
      <Text style={styles.detail}>Mass: {person.mass}</Text>
      <Text style={styles.detail}>Hair Color: {person.hair_color}</Text>
      <Text style={styles.detail}>Skin Color: {person.skin_color}</Text>
      <Text style={styles.detail}>Eye Color: {person.eye_color}</Text>
    </ScrollView>
  );
};

export default PersonDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.containerBackground,
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  detail: {
    fontSize: 16,
    color: colors.text,
  },
  detailContainer: {
    padding: 10,
    borderRadius: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
