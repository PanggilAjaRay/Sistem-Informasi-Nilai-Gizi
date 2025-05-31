// Common types for the application

export interface NutritionalValue {
  energy: { value: number; unit: string };
  protein: { value: number; unit: string };
  carbohydrates: { value: number; unit: string };
  sugar: { value: number; unit: string };
  fat: { value: number; unit: string };
  salt?: { value: number; unit: string }; // Optional for beverages
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  category: 'food' | 'beverage';
  price: number;
  imageUrl: string;
  nutritionalValues: NutritionalValue;
}

export interface User {
  id: string;
  username: string;
  name: string;
  role: 'admin';
}