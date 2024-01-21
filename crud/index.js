import axios from "axios";

const BASE_URL = "https://travel051-theta.vercel.app/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Register user
export const registerUser = async (userData) => {
  console.log("in register");
  try {
    const response = await api.post("/register", userData);
    return response.data.user;
  } catch (error) {
    console.log("error occured");
    throw error.response.data;
  }
};

// Login user
export const loginUser = async (userData) => {
  try {
    const response = await api.post("/login", userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get all users
export const getAllUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get user by ID
export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update user by ID
export const updateUserById = async (userId, newData) => {
  try {
    const response = await api.put(`/update/${userId}`, { newData });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Delete user by ID
export const deleteUserById = async (userId) => {
  try {
    const response = await api.delete(`/delete/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// external api

export const getFlights = async (data) => {
  const date = data.date.split("-");
  console.log(`${date[0]}-${date[1]}`);
  const options = {
    method: "GET",
    url: "https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v1/prices/calendar",
    params: {
      calendar_type: "departure_date",
      destination: data.destination,
      origin: data.origin,
      depart_date: `${date[0]}-${date[1]}`,
      currency: "rwf",
      length: "1",
    },
    headers: {
      "X-Access-Token": "516389f25177dff5379cd20f6832cf05",
      "X-RapidAPI-Key": "291956e6a0msh45c40c5ab4a881ep1bea65jsn220317b787e4",
      "X-RapidAPI-Host":
        "travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default api;
