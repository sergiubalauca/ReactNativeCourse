import { Person } from '@/types/interfaces';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { colors } from '@/constants/colors';
import PersonComponent from '@/components/Person';
import ListEmptyComponent from '@/components/ListEmptyComponent';
const People = () => {
  const [people, setPeople] = useState<Array<Person>>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

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

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    fetchPeople();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={people}
        renderItem={({ item }) => <PersonComponent person={item} />}
        keyExtractor={(item) => item.name.toString()}
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
  },
});
