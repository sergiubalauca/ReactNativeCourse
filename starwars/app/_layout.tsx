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
          borderTopWidth: 1,
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
          headerShown: false, // hide the header for this screen, because we have a custom header in the FilmsLayout
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="film" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="people"
        options={{
          title: 'People',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="people-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="star-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
