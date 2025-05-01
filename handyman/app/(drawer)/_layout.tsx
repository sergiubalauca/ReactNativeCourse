import { colors } from '@/constants/colors';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Layout = () => {
  return (
    <GestureHandlerRootView>
      <Drawer
        screenOptions={{
          drawerHideStatusBarOnOpen: true,
          drawerActiveTintColor: colors.primary,
          drawerInactiveTintColor: colors.inactive,
          headerTintColor: colors.secondary,
        }}
      >
        <Drawer.Screen name="index" options={{ title: 'Manage Locations' }} />
        <Drawer.Screen name="location" options={{ title: 'Location' }} />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default Layout;
