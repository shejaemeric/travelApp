import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { HeartIcon } from "react-native-heroicons/solid";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Tickets = () => {
  const route = useRoute();

  const flightData = route.params?.flightData || {};
  const origin = route.params?.origin || {};
  const destination = route.params?.destination || {};

  console.log(flightData);

  const renderFlight = ({ item }) => {
    return <FlightCard flight={item} />;
  };

  const flights = Object.values(flightData);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Flights</Text>
      {flights.length > 0 ? (
        <FlatList
          data={flights}
          keyExtractor={(flight) => flight.flight_number}
          renderItem={renderFlight}
        />
      ) : (
        <Text style={styles.header}>No Results</Text>
      )}
    </View>
  );
};

const FlightCard = ({ flight }) => {
  const {
    origin,
    destination,
    airline,
    departure_at,
    return_at,
    price,
    flight_number,
    transfers,
  } = flight;

  return (
    <TouchableOpacity style={styles.card}>
      <View style={{ display: "flex", flexDirection: "rows" }}>
        <Text style={styles.cardHeader}>{`${origin} to ${destination}`}</Text>
        <TouchableOpacity
          style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
          className="absolute top-1 right-3 rounded-full p-3"
        >
          <HeartIcon size={wp(5)} color={"red"} />
        </TouchableOpacity>
      </View>

      <Text
        style={styles.subheader}
      >{`Flight ${flight_number} - ${airline}`}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.info}>{`Departure: ${departure_at}`}</Text>
        <Text style={styles.info}>{`Return: ${return_at}`}</Text>
        <Text style={styles.info}>{`Transfers: ${transfers}`}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text
          style={styles.price}
        >{`Price: ${price.toLocaleString()} Rwf`}</Text>
        {/* <Image
          source={require("../../assets/images/welcome.png")}
          style={styles.airplaneIcon}
        /> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5", // Light background color
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 36,
    color: "#333", // Dark text color
    textAlign: "center",
  },

  cardHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 5,
    color: "#333", // Dark text colo
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 3,
  },
  subheader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007BFF", // Blue text color
    marginBottom: 8,
  },
  infoContainer: {
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
    color: "#555", // Dark text color
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#28a745", // Green text color
  },
  airplaneIcon: {
    height: 24,
    width: 24,
  },
});

export default Tickets;
