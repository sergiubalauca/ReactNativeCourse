import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { Location } from '@/types/interfaces';
import LocationForm from '../components/LocationForm';
import LocationListItem from '../components/LocationListItem';



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

  const deleteLocation = async (id: number) => {
    await DB.runAsync('DELETE FROM locations WHERE id = ?', id);
    loadLocations();
  };

  return (
    <View style={styles.container}>
      <LocationForm onSubmit={addLocation} />
      <FlatList
        data={locations}
        renderItem={({ item }) => (
          <LocationListItem location={item} onDelete={deleteLocation} />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No locations found</Text>
        }
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  },
});
