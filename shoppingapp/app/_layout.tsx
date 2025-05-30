import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useReactQueryDevTools } from '@dev-plugins/react-query';

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
              backgroundColor: '#123456',
            },
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
