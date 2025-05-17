import { Slot, useRouter } from 'expo-router';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { SQLiteDatabase, SQLiteProvider } from 'expo-sqlite';
import { Suspense, useEffect } from 'react';
import * as Notifications from 'expo-notifications';

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const { taskId, locationId } =
          response.notification.request.content.data;
        console.log('Notification response received:', taskId, locationId);

        if (taskId && locationId) {
          router.push(`/location/${locationId}/new-task?taskId=${taskId}`);
        }
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <Suspense
      fallback={
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Loading app...</Text>
        </View>
      }
    >
      <SQLiteProvider
        useSuspense
        databaseName="reports.db"
        onInit={migrateDbIfNeeded}
      >
        {/* somewhat similar to <router-outlet> in angular */}
        <Slot />
      </SQLiteProvider>
    </Suspense>
  );
}

async function migrateDbIfNeeded(db: SQLiteDatabase) {
  // Simulate a loading time of two seconds in order to basically simulate the suspense mechanism.
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const DATABASE_VERSION = 8;
  let version = await db.getFirstAsync<{ user_version: number }>(
    'PRAGMA user_version'
  );
  console.log('🚀 ~ migrateDbIfNeeded ~ version:', version);
  if (!version) return;

  let currentDbVersion = version.user_version;

  if (currentDbVersion >= DATABASE_VERSION) {
    console.log('DB is up to date');
    return;
  }
  if (currentDbVersion === 0) {
    console.log('Migrating db to version 1');
    await db.execAsync(`
    PRAGMA journal_mode = 'wal';
    CREATE TABLE IF NOT EXISTS locations (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      isUrgent INTEGER NOT NULL,
      locationId INTEGER,
      imageUri TEXT,
      FOREIGN KEY (locationId) REFERENCES locations(id)
    );
`);
    await db.runAsync('INSERT INTO locations (name) VALUES (?)', 'School');
    await db.runAsync('INSERT INTO locations (name) VALUES (?)', 'Hospital');
    // await db.runAsync('INSERT INTO locations (name) VALUES (?)', 'Home');
    // await db.runAsync('INSERT INTO locations (name) VALUES (?)', 'Office');
    // await db.runAsync(
    //   'INSERT INTO tasks (title, description, isUrgent, locationId) VALUES (?, ?, ?, ?)',
    //   ['Task 1', 'Description 1', 0, 14]
    // );
    // await db.runAsync(
    //   'INSERT INTO tasks (title, description, isUrgent, locationId) VALUES (?, ?, ?, ?)',
    //   ['Task 2', 'Description 2', 1, 15]
    // );

    // currentDbVersion = 6;
  }

  await db.runAsync('INSERT INTO locations (name) VALUES (?)', 'Home');
  await db.runAsync('INSERT INTO locations (name) VALUES (?)', 'Office');
  await db.runAsync(
    'INSERT INTO tasks (title, description, isUrgent, locationId) VALUES (?, ?, ?, ?)',
    ['Task 1', 'Description 1', 0, 14]
  );
  await db.runAsync(
    'INSERT INTO tasks (title, description, isUrgent, locationId) VALUES (?, ?, ?, ?)',
    ['Task 2', 'Description 2', 1, 15]
  );

  currentDbVersion = 7;

  console.log(`Migrating db to version ${DATABASE_VERSION}`);
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);

  const tasks = await db.getAllAsync('SELECT * FROM tasks');
  console.log('After migration Tasks:', tasks);
}

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#0000ff',
  },
});
