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
  updateUserName,
  addDestination,
  deleteDestination,
} from "../../sqlite";
import { destinationData } from "../constants";

const sortCategories = () => {
  const navigation = useNavigation();
  const [destinations, setDestinations] = useState([]);
  const [activeSort, setActiveSort] = useState("All");

  useEffect(() => {
    createTable();
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

  const likeDestination = async (selected) => {
    await addDestination(
      selected,
      () => {
        console.log(`Liked destination with title: ${selected.title}`);
        fetchDestinations(); // Refresh destinations after like
      },
      (error) => {
        console.error("Error liking destination: ", error);
      }
    );
  };

  const unlikeDestination = async (destinationId) => {
    await deleteDestination(
      destinationId,
      () => {
        console.log(`Unliked destination with ID: ${destinationId}`);
        fetchDestinations(); // Refresh destinations after unlike
      },
      (error) => {
        console.error("Error unliking destination: ", error);
      }
    );
  };

  const handleToggleFavourite = async (selected) => {
    const destination = destinations.find(
      (dest) => dest.title === selected.title
    );
    const isLiked = selected?.liked === 1;

    if (!isLiked) {
      await likeDestination(selected);
    } else {
      if (activeSort === "All") {
        await unlikeDestination(selected);
      }
    }
  };

  return (
    <View>
      <View style={styles.container}>
        {["All", "Saved"].map((sort, index) => {
          const isActive = sort === activeSort;
          const activeButtonStyle = isActive ? styles.activeButton : {};
          const activeTextStyle = isActive ? styles.activeText : {};

          return (
            <TouchableOpacity
              key={index}
              style={[styles.button, activeButtonStyle]}
              onPress={() => setActiveSort(sort)}
            >
              <Text style={[styles.text, activeTextStyle]}>{sort}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.destinationsContainer}>
        {(activeSort === "All" ? destinationData : destinations)?.map(
          (item, index) => (
            <DestinationCard
              key={index}
              item={item}
              navigation={navigation}
              onToggleFavourite={() => handleToggleFavourite(item)}
              activeSort={activeSort}
              fetchDestinations={fetchDestinations}
            />
          )
        )}
      </View>
    </View>
  );
};

const DestinationCard = ({
  item,
  navigation,
  onToggleFavourite,
  activeSort,
  fetchDestinations,
}) => {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState(item?.title || "");
  const [isFavourite, setFavourite] = useState(item?.liked === 1);

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

      {/* Like/Dislike Button */}
      <TouchableOpacity
        onPress={() => onToggleFavourite(item.id)}
        style={styles.favouriteButton}
      >
        <HeartIcon size={wp(5)} color={isFavourite ? "#FF5454" : "#ddd"} />
      </TouchableOpacity>

      {/* Edit Button (visible only when activeSort is "Saved") */}
      {activeSort === "Saved" && (
        <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      )}

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
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: wp(4),
    backgroundColor: "#297DCA", // Blue background color
    borderRadius: wp(8),
    padding: wp(2),
    paddingHorizontal: wp(4),
    marginBottom: wp(4),
    width: "40%",
  },
  button: {
    paddingVertical: wp(3),
    paddingHorizontal: wp(4),
    borderRadius: wp(7),
  },
  text: {
    fontSize: wp(4),
    fontWeight: "bold",
    color: "white", // Black text color
  },
  activeButton: {
    backgroundColor: "#FFFFFF", // White background color for the selected item
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activeText: {
    color: "#000000", // Dark text color for the selected item
  },
  destinationsContainer: {
    marginTop: wp(4),
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

export default sortCategories;
