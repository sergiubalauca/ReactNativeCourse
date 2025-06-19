import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

const ProductDetails = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>ProductDetails {id}</Text>
    </View>
  );
};

export default ProductDetails;
