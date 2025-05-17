import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Switch,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Task } from '@/types/interfaces';
import * as ImagePicker from 'expo-image-picker';

const NewTask = () => {
  const { id: locationId, taskId } = useLocalSearchParams();
  const router = useRouter();
  const DB = useSQLiteContext();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isUrgent, setIsUrgent] = useState(0);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const loadTaskData = async () => {
    if (taskId) {
      const task = await DB.getFirstAsync<Task>(
        'SELECT * FROM tasks WHERE id = ?',
        [+taskId]
      );

      if (task) {
        setTitle(task.title);
        setDescription(task.description);
        setIsUrgent(task.isUrgent ? 1 : 0);
        setImageUri(task.imageUri ?? '');
      }
    }
  };

  const handleSaveTask = async () => {
    let newTaskId = null;

    if (taskId) {
      await DB.runAsync(
        'UPDATE tasks SET title = ?, description = ?, isUrgent = ?, imageUri = ? WHERE id = ?',
        [title, description, isUrgent, imageUri, +taskId]
      );
    } else {
      const result = await DB.runAsync(
        'INSERT INTO tasks (title, description, isUrgent, locationId, imageUri) VALUES (?, ?, ?, ?, ?)',
        [title, description, isUrgent, +locationId, imageUri]
      );

      newTaskId = result.lastInsertRowId;
    }

    if (isUrgent) {
      // notification
    }
    router.back();
  };

  const handleFinishTask = async () => {
    Alert.alert('Are you sure you want to finish this task?', '', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Finish',
        onPress: async () => {
          await DB.runAsync('DELETE FROM tasks WHERE id = ?', [+taskId]);
          router.back();
        },
      },
    ]);
  };

  useEffect(() => {
    if (taskId) {
      loadTaskData();
    }
  }, [taskId]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri ?? null);
    }
  };

  const handleDeleteImage = () => {
    setImageUri(null);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.description]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline={true}
      />
      <View style={styles.row}>
        <Text>Urgent</Text>
        <Switch
          trackColor={{
            true: '#F2A310',
            false: '#767577',
          }}
          style={styles.switch}
          value={isUrgent === 1}
          onValueChange={(value) => setIsUrgent(value ? 1 : 0)}
        />
      </View>

      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

      {imageUri && (
        <TouchableOpacity style={styles.imageButton} onPress={handleDeleteImage}>
          <Text style={styles.buttonText}>Delete image</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.buttonText}>Add image</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSaveTask}>
        <Text style={styles.buttonText}>{taskId ? 'Update' : 'Create'}</Text>
      </TouchableOpacity>

      {taskId && (
        <TouchableOpacity
          style={[styles.button, styles.finishButton]}
          onPress={handleFinishTask}
        >
          <Text style={styles.buttonText}>Finish task</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default NewTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    padding: 8,
    backgroundColor: 'white',
  },
  description: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  switch: {
    marginTop: 10,
  },
  button: {
    backgroundColor: '#F2A310',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  finishButton: {
    backgroundColor: '#4CAF50',
  },
  imageButton: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 4,
    marginBottom: 16,
  },
});
