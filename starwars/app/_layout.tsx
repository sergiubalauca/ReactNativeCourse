import { colors } from '@/constants/colors';
import { Stack, Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.containerBackground },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: 'bold' },
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 3,
          borderTopColor: colors.text,
        },
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.inactive,
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen
        name="films"
        options={{
          title: 'Films',
          tabBarLabel: 'List of Films',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="film" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen name="people" options={{ title: 'People' }} />
      <Tabs.Screen name="favorites" options={{ title: 'Favorites' }} />
    </Tabs>
  );
}
