import axios from "axios";
import bcrypt from "react-native-bcrypt";
import db from "../App";

export const loginUser = (email, password) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "SELECT * FROM Users WHERE email = ?",
          [email],
          (_, result) => {
            if (result.rows.length > 0) {
              const user = result.rows.item(0);

              // Compare hashed password
              bcrypt.compare(password, user.password, (compareError, match) => {
                if (compareError) {
                  reject(compareError);
                  return;
                }

                if (match) {
                  resolve({ status: "success", user });
                } else {
                  resolve({ status: "error", message: "Invalid password" });
                }
              });
            } else {
              resolve({ status: "error", message: "User not found" });
            }
          },
          (_, error) => reject(error)
        );
      },
      (error) => console.error("Error during login:", error)
    );
  });
};

// Function to check if the provided password is correct during an update
export const checkPassword = (userId, providedPassword) => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT password FROM Users WHERE id = ?",
      [userId],
      (_, result) => {
        if (!result) {
          resolve({ status: "error", message: "User not found" });
          return;
        }

        const hashedPassword = result.password;

        // Compare hashed password
        bcrypt.compare(
          providedPassword,
          hashedPassword,
          (compareError, match) => {
            if (compareError) {
              reject(compareError);
              return;
            }

            if (match) {
              resolve(true);
            } else {
              resolve(false);
            }
          }
        );
      },
      (_, error) => reject(error)
    );
  });
};

export default {
  loginUser,
  checkPassword,
};
