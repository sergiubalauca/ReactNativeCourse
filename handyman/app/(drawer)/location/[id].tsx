import TaskListItem from '@/app/components/TaskListItem';
import { Location, Task } from '@/types/interfaces';
import {
  Link,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { colors } from '@/constants/colors';

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const DB = useSQLiteContext();
  const [locationName, setLocationName] = useState<string>('');

  const [tasks, setTasks] = useState<Task[]>([]);

  const loadLocationData = useCallback(async () => {
    const [location] = await DB.getAllAsync<Location>(
      'SELECT * FROM locations WHERE id = ?',
      [Number(id)]
    );

    if (location) {
      setLocationName(location.name);
    }

    const tasks = await DB.getAllAsync<Task>(
      'SELECT * FROM tasks WHERE locationId = ?',
      [Number(id)]
    );

    console.log('🚀 ~ loadLocationData ~ id:', id);
    console.log('🚀 ~ loadLocationData ~ tasks:', tasks);
    setTasks(tasks);
  }, [id, DB]);

  useFocusEffect(
    useCallback(() => {
      loadLocationData();
    }, [loadLocationData])
  );

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ title: locationName }} />
      <FlatList
        data={tasks}
        renderItem={({ item }) => <TaskListItem task={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No tasks found</Text>
        }
      />
      <Link href={`/location/${id}/new-task`} asChild>
        <TouchableOpacity style={styles.fab}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: colors.primary,
    borderRadius: 28,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabText: {
    fontSize: 24,
    color: 'white',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: colors.inactive,
  },
});
