import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { COLORS } from '@/utils/colors';
import CartButton from '@/components/CartButton';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
    },
  },
});

export default function RootLayout() {
  useReactQueryDevTools(queryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'Galactic Shopping',
            headerShadowVisible: false,
            headerStyle: {
              // backgroundColor: COLORS.,
            },
            headerSearchBarOptions: {
              placeholder: 'Search products',
              hideWhenScrolling: false,
              hideNavigationBar: false,
            },
            headerRight: () => <CartButton />,
          }}
        />
        <Stack.Screen
          name="product/[id]"
          options={{
            title: '',
            headerBackTitle: 'Products',
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
