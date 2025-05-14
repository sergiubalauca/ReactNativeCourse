import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
const NewTask = () => {
  const { id: locationId, taskId } = useLocalSearchParams();

  console.log('locationId', locationId);
  console.log('taskId', taskId);

  return (
    <View>
      <Text>New Task</Text>
    </View>
  );
};

export default NewTask;
