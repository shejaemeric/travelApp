// CRUDOperations.js
import bcrypt from "react-native-bcrypt";
import axios from "axios";
import NetInfo from "@react-native-community/netinfo";
import { AsyncStorage } from "react-native";
import db from "../App";

const api = "http://localhost:3000/api"; // Replace with your API endpoint

const performOfflineSync = async () => {
  try {
    const offlineActions = await AsyncStorage.getItem("offlineActions");
    if (offlineActions) {
      const actions = JSON.parse(offlineActions);

      for (const action of actions) {
        try {
          switch (action.type) {
            case "register":
              await axios.post(`${api}/register`, { data: action.data });
              break;
            case "update":
              await axios.put(`${api}/update/${action.id}`, {
                data: action.data,
              });
              break;
            case "delete":
              await axios.delete(`${api}/delete/${action.id}`, {
                data: action.data,
              });
              break;
            default:
              break;
          }
        } catch (error) {
          console.error(`Error syncing ${action.type} action: `, error);
        }
      }

      // Clear offline actions after successful synchronization
      await AsyncStorage.removeItem("offlineActions");
    }
  } catch (error) {
    console.error("Error performing offline synchronization: ", error);
  }
};

const performLocalTransaction = async (type, data) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      switch (type) {
        case "register":
          tx.executeSql(
            "INSERT INTO Users (username, password) VALUES (?, ?)",
            [data.username, data.password],
            (_, results) => resolve(results.insertId),
            (_, error) => reject(error)
          );
          break;
        case "update":
          tx.executeSql(
            "UPDATE Users SET name = ?, email = ?, password = ? WHERE id = ?",
            [
              data.newData.name,
              data.newData.email,
              data.newData.password,
              data.id,
            ],
            (_, results) => resolve(results.changes),
            (_, error) => reject(error)
          );
          break;
        case "delete":
          tx.executeSql(
            "DELETE FROM Users WHERE id = ?",
            [data.id],
            (_, results) => resolve(results.changes),
            (_, error) => reject(error)
          );
          break;
        default:
          reject(new Error("Invalid transaction type"));
      }
    });
  });
};

const createUser = async (username, password) => {
  try {
    const response = await axios.post(`http://localhost:3000/api/register`, {
      username,
      password,
    });
    return response?.data;
  } catch (error) {
    if (!(await NetInfo?.fetch())?.isConnected) {
      const offlineActions = await AsyncStorage.getItem("offlineActions");
      const actions = JSON.parse(offlineActions) || [];
      actions?.push({ type: "register", data: { username, password } });
      await AsyncStorage.setItem(
        "offlineActions",
        JSON.stringify(actions ?? [])
      );
    } else {
      await performLocalTransaction("register", { username, password });
      await performOfflineSync();
    }

    throw error;
  }
};

const updateUserById = async (id, newData) => {
  try {
    const response = await axios.put(`${api}/update/${id}`, { newData });
    return response?.data;
  } catch (error) {
    if (!(await NetInfo.fetch()).isConnected) {
      const offlineActions = await AsyncStorage.getItem("offlineActions");
      const actions = JSON.parse(offlineActions) || [];
      actions.push({ type: "update", data: { id, newData } });
      await AsyncStorage.setItem(
        "offlineActions",
        JSON.stringify(actions ?? [])
      );
    } else {
      await performLocalTransaction("update", { id, newData });
      await performOfflineSync();
    }

    throw error;
  }
};

const deleteUserById = async (id) => {
  try {
    const response = await axios.delete(`${api}/delete/${id}`, {
      data: { id },
    });
    return response?.data;
  } catch (error) {
    if (!(await NetInfo.fetch()).isConnected) {
      const offlineActions = await AsyncStorage.getItem("offlineActions");
      const actions = JSON.parse(offlineActions) || [];
      actions.push({ type: "delete", data: { id } });
      await AsyncStorage.setItem(
        "offlineActions",
        JSON.stringify(actions ?? [])
      );
    } else {
      await performLocalTransaction("delete", { id });
      await performOfflineSync();
    }

    throw error;
  }
};

export default { createUser, updateUserById, deleteUserById };
