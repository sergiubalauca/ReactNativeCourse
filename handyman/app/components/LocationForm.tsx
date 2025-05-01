import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
type LocationFormProps = {
  onSubmit: (name: string) => void;
};

const LocationForm = ({ onSubmit }: LocationFormProps) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim() === '') {
      return;
    }
    onSubmit(name);
    setName('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Location name"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LocationForm;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // gap: 4,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 5,
    padding: 8,
    margin: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
