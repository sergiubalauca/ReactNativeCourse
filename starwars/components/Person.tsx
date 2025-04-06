import { colors } from '@/constants/colors';
import { Person } from '@/types/interfaces';
import Link from 'expo-router/link';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PersonComponent = ({ person }: { person: Person }) => {
  const id = person.url.split('/').filter(Boolean).pop();

  return (
    <Link href={`/people/${id}`} asChild>
      <TouchableOpacity style={styles.personItem}>
        <Text style={styles.personName}>{person.name}</Text>
      </TouchableOpacity>
    </Link>
  );
};

export default PersonComponent;

const styles = StyleSheet.create({
  personItem: {
    backgroundColor: colors.itemBackground,
    padding: 10,
    borderRadius: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 20,
    marginVertical: 8,
  },
  personName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
});
