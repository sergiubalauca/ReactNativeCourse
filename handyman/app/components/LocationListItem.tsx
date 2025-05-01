import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Location } from '@/types/interfaces';
import { Ionicons } from '@expo/vector-icons';

type LocationListItemProps = {
  location: Location;
  onDelete: (id: number) => void;
};

const LocationListItem = ({
  location,
  onDelete,
}: LocationListItemProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{location.name}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(location.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
        <Ionicons name="trash" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default LocationListItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    padding: 5,
    marginBottom: 4,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
