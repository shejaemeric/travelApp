export default {
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  loginUser,
  checkPassword,
};

// Example Usage:

// (async () => {
//   try {
//     // Create user
//     const userId = await createUser('john_doe', 'password123');
//     console.log('User Created with ID:', userId);

//     // Get user by ID
//     const user = await getUserById(userId);
//     console.log('User:', user);

//     // Update user
//     const updatedRows = await updateUserById(userId, {
//       username: 'john_doe_updated',
//       password: 'newpassword',
//     });
//     console.log('User Updated. Rows Updated:', updatedRows);

//     // Delete user
//     const deletedRows = await deleteUserById(userId);
//     console.log('User Deleted. Rows Deleted:', deletedRows);
//   } catch (error) {
//     console.error('Error:', error);
//   } finally {
//     // Close the database connection
//     db.close();
//   }
// })();

// (async () => {
//   try {
//     // Store user data
//     const storedUser = await storeUserData('john_doe', 'password123');
//     console.log('User Stored:', storedUser);

//     // Get stored user data by ID
//     const retrievedUser = await getStoredUserDataById(storedUser.id);
//     console.log('Retrieved User:', retrievedUser);

//     // Update stored user data by ID with offline-online sync
//     const updatedUser = await updateStoredUserDataByIdWithSync(storedUser.id, {
//       username: 'john_doe_updated',
//       password: 'newpassword',
//     });
//     console.log('User Updated:', updatedUser);

//     // Delete stored user data by ID
//     const deletedUser = await deleteStoredUserDataById(storedUser.id);
//     console.log('Deleted User:', deletedUser);
//   } catch (error) {
//     console.error('Error:', error);
//   } finally {
//     // Close the database connection
//     db.close();
//   }
// })();
