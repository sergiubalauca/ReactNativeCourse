import { colors } from '@/constants/colors';
import { Film } from '@/types/interfaces';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';

const Films = () => {
  const [films, setFilms] = useState<Array<Film>>([]);

  // useState is React's way of handling component state, similar to Angular's properties
  // The first value (refreshing) is the state variable, like a property in Angular
  // The second value (setRefreshing) is a function to update the state, similar to this.property = newValue
  // useState(false) sets the initial value to false
  const [refreshing, setRefreshing] = useState(false);

  // Another example of useState - we can have multiple state variables
  // In Angular, these would be separate properties like:
  // loading: boolean = false;
  const [loading, setLoading] = useState(false);

  // fetchFilms is an async function that fetches the films from the API
  // It sets the loading state to true, fetches the data, and then sets the loading state to false
  // The data is then set to the films state variable
  // The useEffect hook is used to fetch the data when the component is mounted
  // The useEffect hook is similar to Angular's OnInit lifecycle hook

  const fetchFilms = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://swapi.dev/api/films/');
      const data = await response.json();
      console.log('GSB data', data);
      setFilms(data.results);
    } catch (error) {
      console.error('Error fetching films:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFilms();
  }, []); // calling this with empty array means it will only run once

  const renderItem = ({ item }: { item: Film }) => {
    return (
      <Text
        style={{
          color: colors.text,
          fontSize: 15,
        }}
      >
        {item.title}
      </Text>
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchFilms();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={films}
        keyExtractor={(item) => item.episode_id.toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.text}
          />
        }
        ListEmptyComponent={
          <Text style={{ color: colors.text }}>No films found</Text>
        }
      ></FlatList>
    </View>
  );
};

export default Films;

const styles = StyleSheet.create({
  container: {
    flex: 1, // expands the whole view
    backgroundColor: colors.background,
  },
});
