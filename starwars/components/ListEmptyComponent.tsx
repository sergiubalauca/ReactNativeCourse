import { colors } from '@/constants/colors';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface ListEmptyComponentProps {
  message?: string;
  loading?: boolean;
}

const ListEmptyComponent = ({
  loading,
  message = 'No items found',
}: ListEmptyComponentProps) => {
  return (
    <View style={styles.emptyContainer}>
      {loading ? (
        <ActivityIndicator size="large" color={colors.text} />
      ) : (
        <Text style={styles.emptyText}>{message}</Text>
      )}
    </View>
  );
};

export default ListEmptyComponent;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  emptyText: {
    color: '#666',
    fontSize: 20,
  },
});
