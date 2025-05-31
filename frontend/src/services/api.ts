import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Sesuaikan dengan URL backend Laravel

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Food APIs
export const getFoods = async () => {
  const response = await api.get('/foods');
  return response.data;
};

export const getFoodById = async (id: string) => {
  const response = await api.get(`/foods/${id}`);
  return response.data;
};

export const getFeaturedFoods = async () => {
  const response = await api.get('/foods/featured');
  return response.data;
};

// Beverage APIs
export const getBeverages = async () => {
  const response = await api.get('/beverages');
  return response.data;
};

export const getBeverageById = async (id: string) => {
  const response = await api.get(`/beverages/${id}`);
  return response.data;
};

export const getFeaturedBeverages = async () => {
  const response = await api.get('/beverages/featured');
  return response.data;
};

export default api;
