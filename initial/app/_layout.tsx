import { Stack, Tabs } from 'expo-router';

export default function RootLayout() {
  // return <Stack />; // Option 1: Stack Navigation

  return (
    // Option 2: Tab Navigation
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="details"
        options={{
          title: 'Details',
        }}
      />
    </Tabs>
  );

  // Option 3: Drawer Navigation
  // return (
  //   <Drawer>
  //     <Drawer.Screen name="index" options={{ title: 'Home' }} />
  //   </Drawer>
  // );
}
