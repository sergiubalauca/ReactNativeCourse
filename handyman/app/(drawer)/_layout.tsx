import { colors } from '@/constants/colors';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SQLite from 'expo-sqlite';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { Image, View, StyleSheet, Text } from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  useDrawerStatus,
} from '@react-navigation/drawer';
import { usePathname, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Location } from '@/types/interfaces';
import Logo from '@/assets/images/test.png';

const DB = SQLite.openDatabaseSync('reports.db');
// const LOGO_IMAGE = Image.resolveAssetSource(require('@/assets/images/logo.png'));
const LOGO_IMAGE = Image.resolveAssetSource(Logo).uri;

const customDrawerContent = (props: DrawerContentComponentProps) => {
  // to display custom drawer content
  const router = useRouter();
  const { bottom } = useSafeAreaInsets(); // to get the bottom safe area inset
  const DB = useSQLiteContext();
  const [locations, setLocations] = useState<Location[]>([]);
  const isDrawerOpen = useDrawerStatus() === 'open';
  const pathname = usePathname();

  useEffect(() => {
    if (isDrawerOpen) {
      loadLocations();
    }
  }, [isDrawerOpen]);

  const loadLocations = async () => {
    const locations = await DB.getAllAsync<Location>('SELECT * FROM locations');
    setLocations(locations);
    console.log('GSB locations: ', locations);
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView>
        <Image source={{ uri: LOGO_IMAGE }} style={styles.logo} />
        <View style={styles.locationContainer}>
          <DrawerItemList {...props}></DrawerItemList>
          <Text style={styles.title}>Locations</Text>
          {locations.map((location) => {
            const isActive = pathname === `/location/${location.id}`;

            return (
              <DrawerItem
                key={location.id}
                label={location.name}
                onPress={() => {
                  router.navigate(`/location/${location.id}`);
                  props.navigation.closeDrawer();
                }}
                focused={isActive}
                inactiveTintColor={colors.inactive}
                activeTintColor={colors.primary}
              ></DrawerItem>
            );
          })}
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          paddingBottom: 20 + bottom,
          borderTopWidth: 1,
          borderTopColor: '#dde3fe',
          padding: 16,
        }}
      >
        <Text>My footer</Text>
      </View>
    </View>
  );
};

const Layout = () => {
  useDrizzleStudio(DB);

  return (
    <GestureHandlerRootView>
      <Drawer
        drawerContent={customDrawerContent}
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
        <Drawer.Screen
          name="location"
          options={{
            title: 'Location',
            headerShown: false,
            drawerItemStyle: {
              display: 'none',
            },
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default Layout;

const styles = StyleSheet.create({
  logo: {
    width: 110,
    height: 110,
    borderRadius: 100,
    marginBottom: 10,
    alignSelf: 'center',
  },
  locationContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 14,
    paddingTop: 25,
    color: colors.drawerTitle,
  },
});
