import { colors } from '@/constants/colors';
import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

const PeopleLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: { backgroundColor: colors.containerBackground },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'People' }} />
      <Stack.Screen name="[id]" options={{ title: 'Person Details' }} />
    </Stack>
  );
};

export default PeopleLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
