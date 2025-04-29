import { Person } from '@/types/interfaces';
import { useState, useEffect, useCallback } from 'react';
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
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();

  const fetchPeople = useCallback(async (pageNum: number, search?: string) => {
    if (loading) return;
    
    setLoading(true);
    try {
      const baseUrl = 'https://swapi.dev/api/people/';
      const url = search
        ? `${baseUrl}?search=${search}`
        : `${baseUrl}?page=${pageNum}`;

      const response = await fetch(url);
      const data = await response.json();

      if (search || pageNum === 1) {
        setPeople(data.results);
        setPage(1);
      } else {
        setPeople(prev => [...prev, ...data.results]);
      }

      setHasMore(data.next !== null);
    } catch (error) {
      console.error('Error fetching people:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [loading]);

  // Initial load
  useEffect(() => {
    fetchPeople(1);
  }, []);

  // Handle search with debouncing
  useEffect(() => {
    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set new timeout for debouncing
    const timeout = setTimeout(() => {
      if (searchQuery) {
        fetchPeople(1, searchQuery);
      } else {
        fetchPeople(1);
      }
    }, 500); // 500ms debounce

    setSearchTimeout(timeout);

    // Cleanup
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchQuery]);

  const loadMore = () => {
    if (!loading && hasMore && !searchQuery) {
      fetchPeople(page + 1);
      setPage(prev => prev + 1);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    fetchPeople(1, searchQuery);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerSearchBarOptions: {
            placeholder: 'Search',
            onChangeText: (event) => {
              setSearchQuery(event.nativeEvent.text);
            },
          },
        }}
      />
      <FlatList
        data={people}
        renderItem={({ item }) => <PersonComponent person={item} />}
        keyExtractor={(item) => item.url}
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
