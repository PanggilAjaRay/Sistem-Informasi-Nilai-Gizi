import React, { useState } from 'react';
import { FoodItem, NutritionalValue } from '../../types';
import Button from '../ui/Button';

interface FoodFormProps {
  initialData?: FoodItem;
  onSubmit: (data: FoodItem) => void;
  onCancel: () => void;
}

const defaultNutritionalValues: NutritionalValue = {
  energy: { value: 0, unit: 'kkal' },
  protein: { value: 0, unit: 'g' },
  carbohydrates: { value: 0, unit: 'g' },
  sugar: { value: 0, unit: 'g' },
  fat: { value: 0, unit: 'g' },
  salt: { value: 0, unit: 'g' },
};

const FoodForm: React.FC<FoodFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<FoodItem>(
    initialData || {
      id: crypto.randomUUID(),
      name: '',
      description: '',
      category: 'food',
      price: 0,
      imageUrl: '',
      nutritionalValues: { ...defaultNutritionalValues },
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNutritionChange = (
    nutrient: keyof NutritionalValue,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      nutritionalValues: {
        ...prev.nutritionalValues,
        [nutrient]: {
          ...prev.nutritionalValues[nutrient],
          value: parseFloat(value) || 0,
        },
      },
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required';
    }

    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (formData.nutritionalValues.energy.value <= 0) {
      newErrors.energy = 'Energy value must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  // Dynamic nutrition fields based on category
  const renderNutritionFields = () => {
    const fields = [
      { key: 'energy', label: 'Energy (kkal)' },
      { key: 'protein', label: 'Protein (g)' },
      { key: 'carbohydrates', label: 'Carbohydrates (g)' },
      { key: 'sugar', label: 'Sugar (g)' },
      { key: 'fat', label: 'Fat (g)' },
    ];

    // Add salt field only for food items
    if (formData.category === 'food') {
      fields.push({ key: 'salt', label: 'Salt (g)' });
    }

    return fields.map((field) => (
      <div key={field.key} className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {field.label}
        </label>
        <input
          type="number"
          step="0.1"
          min="0"
          className={`shadow appearance-none border ${
            errors[field.key] ? 'border-red-500' : 'border-gray-300'
          } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500`}
          value={formData.nutritionalValues[field.key as keyof NutritionalValue]?.value || 0}
          onChange={(e) => 
            handleNutritionChange(field.key as keyof NutritionalValue, e.target.value)
          }
        />
        {errors[field.key] && (
          <p className="text-red-500 text-xs italic mt-1">{errors[field.key]}</p>
        )}
      </div>
    ));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">
        {initialData ? 'Edit Item' : 'Add New Item'}
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Category
        </label>
        <select
          name="category"
          className="shadow border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="food">Food</option>
          <option value="beverage">Beverage</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          name="name"
          className={`shadow appearance-none border ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500`}
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && (
          <p className="text-red-500 text-xs italic mt-1">{errors.name}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Description
        </label>
        <textarea
          name="description"
          className={`shadow appearance-none border ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500`}
          value={formData.description}
          onChange={handleChange}
          rows={3}
        />
        {errors.description && (
          <p className="text-red-500 text-xs italic mt-1">{errors.description}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Price (IDR)
        </label>
        <input
          type="number"
          name="price"
          min="0"
          className={`shadow appearance-none border ${
            errors.price ? 'border-red-500' : 'border-gray-300'
          } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500`}
          value={formData.price}
          onChange={handleChange}
        />
        {errors.price && (
          <p className="text-red-500 text-xs italic mt-1">{errors.price}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Image URL
        </label>
        <input
          type="text"
          name="imageUrl"
          className={`shadow appearance-none border ${
            errors.imageUrl ? 'border-red-500' : 'border-gray-300'
          } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500`}
          value={formData.imageUrl}
          onChange={handleChange}
        />
        {errors.imageUrl && (
          <p className="text-red-500 text-xs italic mt-1">{errors.imageUrl}</p>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Nutritional Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderNutritionFields()}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? 'Update Item' : 'Add Item'}
        </Button>
      </div>
    </form>
  );
};

export default FoodForm;