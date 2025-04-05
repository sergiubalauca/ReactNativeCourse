import { Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { StyleSheet } from 'react-native';
const FilmsLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: { backgroundColor: colors.containerBackground },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: 'bold' },
        contentStyle: { backgroundColor: colors.containerBackground },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'All Films' }} />
      <Stack.Screen name="[id]" options={{ title: 'Film Details' }} />
    </Stack>
  );
};

export default FilmsLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
