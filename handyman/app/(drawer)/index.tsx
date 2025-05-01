import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Location } from '@/types/interfaces';
import LocationForm from '../components/LocationForm';

const Page = () => {
  const DB = useSQLiteContext();
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    const locations = await DB.getAllAsync<Location>('SELECT * FROM locations');
    setLocations(locations);
    console.log('GSB locations: ', locations);
  };

  const addLocation = async (name: string) => {
    await DB.runAsync('INSERT INTO locations (name) VALUES (?)', name);
    loadLocations();
  };

  return (
    <View style={styles.container}>
      <LocationForm onSubmit={addLocation} />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
