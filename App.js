// App.js
import React, { useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./src/navigation";
import { performOfflineSync } from "./sqlite/syncCrud";
import * as SQLite from "expo-sqlite";

export default function App() {
  const db = SQLite.openDatabase("tripQuest.db");

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, password TEXT,email TEXT)"
    );
  });

  useEffect(() => {
    const syncOnMount = async () => {
      try {
        // Perform offline synchronization when the app is initially loaded
        await performOfflineSync?.(); // Optional chaining for performOfflineSync

        // Listen for changes in network connectivity and trigger synchronization
        const unsubscribe = NetInfo.addEventListener((state) => {
          if (state.isConnected) {
            performOfflineSync?.(); // Optional chaining again
          }
        });

        // Cleanup the subscription when the component unmounts
        return () => unsubscribe();
      } catch (error) {
        // Handle errors during synchronization
        console.error("Error during offline synchronization:", error);
      }
    };

    syncOnMount();
  }, []); // Run only once on mount

  return <AppNavigation />;
}
