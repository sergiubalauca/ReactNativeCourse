import { colors } from '@/constants/colors';
import { Task } from '@/types/interfaces';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
type TaskListItemProps = {
  task: Task;
};

const TaskListItem = ({ task }: TaskListItemProps) => {
  return (
    // Marking as child to avoid the link to be rendered as a button and to pick up the style of the TouchableOpacity
    <Link href={`/location/${task.locationId}/new-task?taskId=${task.id}`} asChild>
      {/* otherwise I cannot use the link correctly if I don't use
      TouchableOpacity */}
      <TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <Text>
              {task.isUrgent ? (
                <Ionicons name="alert-circle" style={styles.icon} color="red" />
              ) : (
                <Ionicons name="checkmark" style={styles.icon} color="green" />
              )}
            </Text>
          </View>
          <View style={styles.taskContainer}>
            <Text style={styles.title}>{task.title}</Text>
            <Text style={styles.description}>{task.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default TaskListItem;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.inactive,
    gap: 10,
  },
  iconContainer: {
    padding: 6,
    borderRadius: 10,
  },
  icon: {
    fontSize: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskContainer: {
    flex: 1,
  },
  description: {
    fontSize: 12,
    color: '#666'
  },
});
