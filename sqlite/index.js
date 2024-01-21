// SQLite code for destinations.db

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("destinations_v1.db");

const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS destinationsTable (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, duration TEXT, distance TEXT, weather TEXT, price INTEGER, short_description TEXT, long_description TEXT, image TEXT, liked INTEGER, user_name TEXT);",
      [],
      () => console.log("Table created successfully"),
      (error) => console.error("Error creating table: ", error)
    );
  });
};

const addDestination = async (destinationData, onSuccess, onError) => {
  console.log("here", destinationData);
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO destinationsTable (title, duration, distance, weather, price, short_description, long_description, image, liked, user_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, '')",
      [
        destinationData?.title,
        destinationData?.duration,
        destinationData?.distance,
        destinationData?.weather,
        destinationData?.price,
        destinationData?.shortDescription,
        destinationData?.longDescription,
        destinationData?.image,
      ],
      (_, result) => {
        console.log("added successfully"), onSuccess(result);
      },
      (error) => onError(error)
    );
  });
  //   const user = await getAllDestinations();
  //   console.log(user);
};

const getAllDestinations = (onSuccess, onError) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM destinationsTable",
      [],
      (_, result) => {
        onSuccess(result);
      },
      (error) => onError(error)
    );
  });
};

const updateDestination = (id, title, onSuccess, onError) => {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE destinationsTable SET title = ? WHERE id = ?",
      [title, id],
      (_, result) => onSuccess(result),
      (error) => onError(error)
    );
  });
};

const deleteDestination = (id, onSuccess, onError) => {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM destinationsTable WHERE id = ?",
      [id],
      (_, result) => onSuccess(result),
      (error) => onError(error)
    );
  });
};

export {
  createTable,
  addDestination,
  getAllDestinations,
  updateDestination,
  deleteDestination,
};
