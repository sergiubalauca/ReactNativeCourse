import { colors } from '@/constants/colors';
import { Film } from '@/types/interfaces';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Link from 'expo-router/link';
// Both lines define the same component but use different TypeScript syntax:
// 1. This defines the props type inline with the parameter:
// const FilmItem = ({ film }: { film: Film }) => {

// 2. This uses React.FC (Function Component) type with props as generic parameter:
// React.FC is a type that includes children props and other React component properties
const FilmItem: React.FC<{ film: Film }> = ({ film }) => {
  const id = film.url.split('/').filter(Boolean).pop();

  return (
    <Link href={`/films/${id}`} asChild>
      {/* I need a generic pressable item to make it work */}
      <TouchableOpacity style={styles.filmItem}>
        <Text style={styles.filmTitle}>{film.title}</Text>
        <Text style={styles.filmDetails}>Episode: {film.episode_id}</Text>
        <Text style={styles.filmDetails}>Released: {film.release_date}</Text>
      </TouchableOpacity>
    </Link>
  );
};
export default FilmItem;

const styles = StyleSheet.create({
  filmItem: {
    backgroundColor: colors.background,
    padding: 10,
    borderRadius: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 20,
    marginVertical: 8,
  },
  filmTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 11,
  },
  filmDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
