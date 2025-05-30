import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL;

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export interface Rating {
  rate: number;
  count: number;
}

export const getProducts = async (): Promise<Product[]> => {
  const url = `${API_URL}/products`;
  console.log('GSB url', url);
  const response = await fetch(url);
  return response.json();
};

export const getProduct = async (id: string): Promise<Product> => {
  const response = await fetch(`${API_URL}/products/${id}`);
  return response.json();
};

export const getCategories = async (): Promise<string[]> => {
  const response = await fetch(`${API_URL}/products/categories`);
  return response.json();
};
