import { colors } from '@/constants/colors';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SQLite from 'expo-sqlite';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
const DB = SQLite.openDatabaseSync('reports.db');

const Layout = () => {
  useDrizzleStudio(DB);

  return (
    <GestureHandlerRootView>
      <Drawer
        screenOptions={{
          drawerHideStatusBarOnOpen: true,
          drawerActiveTintColor: colors.primary,
          drawerInactiveTintColor: colors.inactive,
          headerTintColor: colors.secondary,
          headerStyle: {
            backgroundColor: colors.primary,
          },
        }}
      >
        <Drawer.Screen name="index" options={{ title: 'Manage Locations' }} />
        <Drawer.Screen name="location" options={{ title: 'Location' }} />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default Layout;
