import { getCategories, getProducts, Product } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { ProductCard } from '@/components/ProductCard';
import { COLORS } from '@/utils/colors';
import { Stack } from 'expo-router';
import { useHeaderHeight } from '@react-navigation/elements';
import { ProductShimmerGrid } from '@/components/ProductListShimmer';

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const headerHeight = useHeaderHeight();
  /* We are getting all the products from the hook.
   * We are using the useQuery hook to get the data from the API.
   * We are using the queryKey to identify the data and store it in the cache.
   * We are using the queryFn to get the data from the API.
   * We are using the data to display the products.
   */
  const {
    data: products,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const renderProduct = useCallback(({ item }: { item: Product }) => {
    return <ProductCard product={item} />;
  }, []);

  /* The difference between useMemo and useEffect is that useMemo runs during the rendering process, not after it, and it's used to cache a computed value and also returns a computed value.
   * The difference between useMemo and useCallback is that useMemo returns a computed value and useCallback returns a function.
   */
  const allCategories = useMemo(() => {
    return ['all', ...categories];
  }, [categories]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all' && !searchQuery) {
      return products;
    }
    if (selectedCategory === 'all' && searchQuery) {
      return products?.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return products?.filter((product) => {
      return (
        product.category.toLowerCase() === selectedCategory.toLowerCase() &&
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [products, searchQuery, selectedCategory]);

  return (
    <View
      style={[
        styles.container,
        { marginTop: Platform.select({ ios: headerHeight, android: 0 }) },
      ]}
    >
      <Stack.Screen
        options={{
          headerSearchBarOptions: {
            placeholder: 'Search products',
            hideWhenScrolling: false,
            hideNavigationBar: false,
            onChangeText: (event) => {
              return setSearchQuery(event.nativeEvent.text);
            },
          },
        }}
      />
      <View style={styles.categoryContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContentContainer}
        >
          {allCategories.map((category) => (
            <Pressable
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={[
                styles.categoryButton,
                selectedCategory === category && {
                  ...styles.selectedCategory,
                },
              ]}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category && styles.selectedCategoryText,
                ]}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {isLoading ? (
        <ProductShimmerGrid />
      ) : (
        <FlashList
          estimatedItemSize={200}
          numColumns={2}
          data={filteredProducts}
          renderItem={renderProduct}
          contentContainerStyle={styles.contentContainer}
          keyExtractor={(item) => item.id.toString()}
          onRefresh={refetch}
          refreshing={isRefetching}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.1)',
    height: 60,
    zIndex: 1,
  },
  categoryButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: COLORS.quinary,
    marginRight: 10,
  },
  categoryContentContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.octonary,
  },
  selectedCategoryText: {
    color: COLORS.secondary,
  },
  selectedCategory: {
    backgroundColor: COLORS.primary,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
});
