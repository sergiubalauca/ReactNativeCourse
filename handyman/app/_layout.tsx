import { Slot } from 'expo-router';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { SQLiteDatabase, SQLiteProvider } from 'expo-sqlite';
import { Suspense } from 'react';

export default function RootLayout() {
  return (
    <Suspense fallback={
      <View style={styles.activityIndicator}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading app...</Text>
      </View>
    }>
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

  const DATABASE_VERSION = 1;
  let version = await db.getFirstAsync<{ user_version: number }>(
    'PRAGMA user_version'
  );
  console.log('🚀 ~ migrateDbIfNeeded ~ version:', version);
  if (!version) return;

  let currentDbVersion = version.user_version;

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 0) {
    console.log('Migrating db to version 1');
    await db.execAsync(`
    PRAGMA journal_mode = 'wal';
    CREATE TABLE IF NOT EXISTS locations (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);
    CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, description TEXT NOT NULL, isUrgent INTEGER NOT NULL, locationId INTEGER, imageUri TEXT, FOREIGN KEY (locationId) REFERENCES locations(id));
`);
    await db.runAsync('INSERT INTO locations (name) VALUES (?)', 'School');
    await db.runAsync('INSERT INTO locations (name) VALUES (?)', 'Hospital');
    await db.runAsync(
      'INSERT INTO tasks (title, description, isUrgent, locationId) VALUES (?, ?, ?, ?)',
      ['Task 1', 'Description 1', 0, 1]
    );
    await db.runAsync(
      'INSERT INTO tasks (title, description, isUrgent, locationId) VALUES (?, ?, ?, ?)',
      ['Task 2', 'Description 2', 1, 2]
    );

    currentDbVersion = 1;
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
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
