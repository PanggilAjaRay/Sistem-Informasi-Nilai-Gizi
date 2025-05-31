import React from 'react';
import { NutritionalValue } from '../../types';

interface NutritionLabelProps {
  nutritionalValues: NutritionalValue;
  category: 'food' | 'beverage';
}

const NutritionLabel: React.FC<NutritionLabelProps> = ({ 
  nutritionalValues, 
  category 
}) => {
  // Create nutrition item rows
  const renderNutritionItem = (
    label: string,
    value: number,
    unit: string,
    colorClass: string = 'bg-gray-100'
  ) => (
    <div className={`grid grid-cols-3 py-2 px-4 ${colorClass}`}>
      <div className="font-medium">{label}</div>
      <div className="text-right col-span-2">
        {value} {unit}
      </div>
    </div>
  );

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="bg-gray-800 text-white py-3 px-4 text-lg font-bold">
        Nutrition Facts
      </div>
      
      {/* Energy/Calories */}
      <div className="bg-gray-200 py-3 px-4 border-b border-gray-300">
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold">Energy</div>
          <div className="text-xl font-bold">
            {nutritionalValues.energy.value} {nutritionalValues.energy.unit}
          </div>
        </div>
      </div>
      
      {/* Nutrition Details */}
      <div className="divide-y divide-gray-200">
        {renderNutritionItem(
          'Protein', 
          nutritionalValues.protein.value, 
          nutritionalValues.protein.unit,
          'bg-green-50'
        )}
        
        {renderNutritionItem(
          'Carbohydrates', 
          nutritionalValues.carbohydrates.value, 
          nutritionalValues.carbohydrates.unit,
          'bg-amber-50'
        )}
        
        {renderNutritionItem(
          'Sugar', 
          nutritionalValues.sugar.value, 
          nutritionalValues.sugar.unit
        )}
        
        {renderNutritionItem(
          'Fat', 
          nutritionalValues.fat.value, 
          nutritionalValues.fat.unit,
          'bg-red-50'
        )}
        
        {category === 'food' && nutritionalValues.salt && renderNutritionItem(
          'Salt', 
          nutritionalValues.salt.value, 
          nutritionalValues.salt.unit
        )}
      </div>
      
      <div className="bg-gray-100 py-2 px-4 text-xs text-gray-600">
        * Values are approximated per serving
      </div>
    </div>
  );
};

export default NutritionLabel;