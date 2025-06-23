import { useQuery } from '@tanstack/react-query';
import { Stack, useLocalSearchParams } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { getProduct } from '@/utils/api';
import { ProductDetailsShimmer } from '@/components/ProductDetailsShimmer';
import { Image } from 'expo-image';
import { COLORS } from '@/utils/colors';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ProductDetails = () => {
  const { id } = useLocalSearchParams();
  const { bottom } = useSafeAreaInsets();

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id as string),
  });

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return isLoading ? (
    <ProductDetailsShimmer />
  ) : (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.title }} />
      <ScrollView>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          contentFit="contain"
        />
        <View style={styles.productInfo}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>${product.price}</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
        <View style={styles.rating}>
          {/* TODO: Add a star icon */}
          <Ionicons name="star" size={24} color={COLORS.primary} />
          <Text style={styles.ratingText}>
            {product.rating.rate} ({product.rating.count} reviews)
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={[styles.button, { paddingBottom: bottom }]}>
        <Ionicons name="cart-outline" size={24} color={COLORS.white} />
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 400,
    borderRadius: 10,
    alignSelf: 'center',
    marginLeft: 40,
    marginRight: 40,
  },
  productInfo: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
  },
  rating: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  button: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});
