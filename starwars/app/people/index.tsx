import { Person } from '@/types/interfaces';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { colors } from '@/constants/colors';
import PersonComponent from '@/components/Person';
import ListEmptyComponent from '@/components/ListEmptyComponent';
import { Stack } from 'expo-router';

const People = () => {
  const [people, setPeople] = useState<Array<Person>>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPeople = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://swapi.dev/api/people/?page=${page}`
      );
      const data = await response.json();

      if (page === 1) {
        setPeople(data.results);
      } else {
        setPeople((prev) => [...prev, ...data.results]);
      }

      setHasMore(data.next !== null);
      setPage(page + 1);
    } catch (error) {
      console.error('Error fetching people:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(page + 1);
      fetchPeople();
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  useEffect(() => {
    const fetchPeople = async () => {
      console.log('searchQuery', searchQuery);
      try {
        const response = await fetch(
          `https://swapi.dev/api/people/?search=${searchQuery}`
        );
        const data = await response.json();
        setPeople(data.results);
        // console.log('data', data);
      } catch (error) {
        console.error('Error fetching people:', error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    };
    fetchPeople();
  }, [searchQuery]);

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    fetchPeople();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerSearchBarOptions: {
            placeholder: 'Search',
            onChangeText: (text) => {
              setSearchQuery(text.nativeEvent.text);
            },
          },
        }}
      />
      <FlatList
        data={people}
        renderItem={({ item }) => <PersonComponent person={item} />}
        keyExtractor={(item) => item.name.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.text}
          />
        }
        ListEmptyComponent={
          <ListEmptyComponent loading={loading} message="No people found" />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default People;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: colors.background,
    paddingTop: 50,
  },
  listContent: {
    paddingTop: 100, // Space for search bar
    paddingBottom: 20, // Extra space at bottom
  },
});
