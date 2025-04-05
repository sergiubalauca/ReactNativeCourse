import { Link, router } from 'expo-router';
import {
  Button,
  ScrollView,
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
} from 'react-native';

export default function Index() {
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <TextInput style={styles.textInput} placeholder="Type here"></TextInput>
        <Text style={styles.text}>Edit app/index.tsx to edit this screen.</Text>

        <Button
          title="Go to details 1"
          onPress={() => {
            router.push('/details');
          }}
        />
        <Link href="/details">
          <Text>Go to details 2</Text>
        </Link>
        <Image
          source={require('../assets/images/react-logo.png')}
          style={{ width: 200, height: 200 }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
  },
  scrollView: {
    flexGrow: 1,
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
});
