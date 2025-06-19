import { Product } from '@/utils/api';
import { router } from 'expo-router';
import { Text, StyleSheet, Pressable, View } from 'react-native';
import { Image } from 'expo-image';
import { COLORS } from '@/utils/colors';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Pressable
      style={styles.productCardStyle}
      onPress={() => router.push(`/product/${product.id}`)}
    >
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        contentFit="cover"
      />
      <View style={styles.productInfo}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  productCardStyle: {
    padding: 15,
    borderRadius: 10,
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
    margin: 10,
    gap: 8,
  },

  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productInfo: {
    flexDirection: 'column',
    gap: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
});
