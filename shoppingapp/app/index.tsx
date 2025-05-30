import { getCategories, getProducts } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Text, View } from 'react-native';

export default function Index() {
  /* We are getting all the products from the hook.
   * We are using the useQuery hook to get the data from the API.
   * We are using the queryKey to identify the data and store it in the cache.
   * We are using the queryFn to get the data from the API.
   * We are using the data to display the products.
   */
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  /* The difference between useMemo and useEffect is that useMemo runs during the rendering process, not after it, and it's used to cache a computed value and also returns a computed value.
   * The difference between useMemo and useCallback is that useMemo returns a computed value and useCallback returns a function.
   */
  const allCategories = useMemo(() => {
    return ['all', ...categories];
  }, [categories]);

  // console.log('GSB', products, categories);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Text</Text>
    </View>
  );
}
