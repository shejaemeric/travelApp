import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  createTable,
  getAllDestinations,
  toggleLike,
  updateUserName,
} from "../../sqlite/index";

const Destinations = () => {
  const navigation = useNavigation();
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    createTable(); // Ensure the table exists
    fetchDestinations();
  }, []);

  const fetchDestinations = () => {
    getAllDestinations(
      (result) => {
        setDestinations(result.rows._array);
      },
      (error) => {
        console.error("Error fetching destinations: ", error);
      }
    );
  };

  return (
    <View style={styles.container}>
      {destinations.map((item, index) => (
        <SavedDestinations
          navigation={navigation}
          item={item}
          key={index}
          fetchDestinations={fetchDestinations}
        />
      ))}
    </View>
  );
};

const SavedDestinations = ({ item, navigation, fetchDestinations }) => {
  const [isFavourite, toggleFavourite] = useState(item?.liked === 1);
  const [isDisliked, toggleDislike] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState(item?.title || ""); // Initialize with an empty string

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSaveEdit = () => {
    if (!item) {
      console.error("Item is null or undefined.");
      return;
    }

    updateUserName(
      item.id,
      newName,
      () => {
        setEditing(false);
        fetchDestinations(); // Refresh destinations after update
      },
      (error) => {
        console.error("Error updating name: ", error);
      }
    );
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("destination", { ...item })}
      style={styles.cardContainer}
    >
      <Image source={item?.image} style={styles.image} />

      <LinearGradient
        colors={["transparent", "rgba(0, 0, 0, 0.8)"]}
        style={styles.gradient}
      />

      {/* Like Button */}
      <TouchableOpacity
        onPress={() => {
          toggleLikeDislike(
            item?.id,
            !isFavourite,
            isDisliked,
            () => {
              toggleFavourite(!isFavourite);
              toggleDislike(false);
            },
            (error) => {
              console.error("Error toggling like: ", error);
            }
          );
        }}
        style={styles.favouriteButton}
      >
        <HeartIcon
          size={wp(5)}
          color={isFavourite ? "#FF5454" : isDisliked ? "#000" : "#ddd"}
        />
      </TouchableOpacity>

      {/* Dislike Button */}
      <TouchableOpacity
        onPress={() => {
          toggleLikeDislike(
            item?.id,
            isFavourite,
            !isDisliked,
            () => {
              toggleDislike(!isDisliked);
              toggleFavourite(false);
            },
            (error) => {
              console.error("Error toggling dislike: ", error);
            }
          );
        }}
        style={styles.dislikeButton}
      >
        <HeartIcon
          size={wp(5)}
          color={isDisliked ? "#000" : isFavourite ? "#ddd" : "#000"}
        />
      </TouchableOpacity>

      {/* Edit Button */}
      <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>

      {/* Display the new name in editing mode */}
      {isEditing && (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.editInput}
            value={newName}
            onChangeText={(text) => setNewName(text)}
          />
          <TouchableOpacity onPress={handleSaveEdit} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.textContainer}>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.description}>{item?.short_description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: wp(4),
  },
  cardContainer: {
    width: wp(44),
    height: wp(65),
    borderRadius: wp(3.5),
    overflow: "hidden",
    marginBottom: wp(5),
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: wp(3.5),
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderBottomLeftRadius: wp(3.5),
    borderBottomRightRadius: wp(3.5),
  },
  favouriteButton: {
    position: "absolute",
    top: wp(1),
    right: wp(3),
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: wp(8),
    padding: wp(3),
    color: "white",
  },
  editButton: {
    position: "absolute",
    top: wp(1),
    left: wp(3),
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: wp(8),
    padding: wp(3),
  },
  editButtonText: {
    color: "white",
  },
  editContainer: {
    position: "absolute",
    top: wp(10),
    left: wp(5),
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: wp(3),
    padding: wp(2),
    flexDirection: "row",
  },
  editInput: {
    flex: 1,
    padding: wp(1),
  },
  saveButton: {
    backgroundColor: "skyblue",
    borderRadius: wp(3),
    padding: wp(2),
  },
  saveButtonText: {
    color: "white",
  },
  textContainer: {
    position: "absolute",
    bottom: wp(4),
    left: wp(2),
    width: "90%",
    zIndex: 1,
  },
  title: {
    fontSize: wp(4),
    fontWeight: "bold",
    color: "white",
  },
  description: {
    fontSize: wp(2.2),
    color: "white",
  },
  dislikeButton: {
    position: "absolute",
    top: wp(1),
    right: wp(10),
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: wp(8),
    padding: wp(3),
    color: "white",
  },
});

export default Destinations;
