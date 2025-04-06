import { FAVORITES_KEY } from '@/constants/store-keys';
import { Film } from '@/types/interfaces';
import { colors } from '@/constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

const Favorites = () => {
  const [favorites, setFavorites] = useState<Film[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchFavorites = async () => {
    try {
      const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
      setFavorites(favorites ? (JSON.parse(favorites) as Array<Film>) : []);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchFavorites();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchFavorites();
  };

  const handleRemoveFavorite = async (film: Film) => {
    const updatedFavorites = favorites.filter(
      (f) => f.episode_id !== film.episode_id
    );
    try {
      await AsyncStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(updatedFavorites)
      );
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const renderItem = ({ item }: { item: Film }) => {
    return (
      <View style={styles.filmItem}>
        <Text style={styles.filmTitle}>{item.title}</Text>
        <TouchableOpacity onPress={() => handleRemoveFavorite(item)}>
          <Ionicons name="trash" size={18} color={colors.text} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.episode_id.toString()}
        contentContainerStyle={styles.flatList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.text}
          />
        }
      />
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.containerBackground,
  },
  flatList: {
    padding: 10,
  },
  filmItem: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.itemBackground,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  filmTitle: {
    fontSize: 16,
    color: colors.text,
  },
});
