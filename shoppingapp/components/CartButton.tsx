import useCartStore from '@/store/cartStore';
import { COLORS } from '@/utils/colors';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native';

const CartButton = () => {
  const { count } = useCartStore();
  console.log('count', count);
  return (
    <Pressable style={styles.container}>
      <Ionicons name="cart-outline" size={24} color={COLORS.primary} />
      <Text>{count}</Text>
    </Pressable>
  );
};

export default CartButton;

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    // bottom: 20,
    // right: 20,
    // flexDirection: 'row',
    // alignItems: 'center',
    // gap: 10,
    // backgroundColor: COLORS.primary,
    // padding: 10,
    // borderRadius: 10,
    // top: 10,
  },
});
