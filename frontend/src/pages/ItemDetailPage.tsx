import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileDown } from 'lucide-react';
import { mockFoodItems } from '../data/mockData';
import NutritionLabel from '../components/ui/NutritionLabel';
import Layout from '../components/common/Layout';
import Button from '../components/ui/Button';

const ItemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const item = mockFoodItems.find((item) => item.id === id);
  
  if (!item) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Item Not Found</h1>
          <p className="text-gray-600 mb-6">
            The item you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </Layout>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleExportToExcel = () => {
    // Create CSV content
    const headers = ['Property', 'Value', 'Unit'];
    const rows = [
      ['Name', item.name, ''],
      ['Category', item.category, ''],
      ['Price', item.price.toString(), 'IDR'],
      ['Energy', item.nutritionalValues.energy.value.toString(), item.nutritionalValues.energy.unit],
      ['Protein', item.nutritionalValues.protein.value.toString(), item.nutritionalValues.protein.unit],
      ['Carbohydrates', item.nutritionalValues.carbohydrates.value.toString(), item.nutritionalValues.carbohydrates.unit],
      ['Sugar', item.nutritionalValues.sugar.value.toString(), item.nutritionalValues.sugar.unit],
      ['Fat', item.nutritionalValues.fat.value.toString(), item.nutritionalValues.fat.unit],
    ];

    if (item.category === 'food' && item.nutritionalValues.salt) {
      rows.push(['Salt', item.nutritionalValues.salt.value.toString(), item.nutritionalValues.salt.unit]);
    }

    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${item.name.toLowerCase().replace(/\s+/g, '-')}-nutrition.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-green-600 hover:text-green-700 mb-6"
        >
          <ArrowLeft size={18} className="mr-1" /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            <div className="rounded-lg overflow-hidden shadow-md bg-white mb-6">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-80 object-cover"
              />
            </div>

            {/* Export Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Export Data</h3>
                <Button
                  onClick={handleExportToExcel}
                  variant="primary"
                  size="sm"
                >
                  <FileDown size={18} className="mr-2" />
                  Export to Excel
                </Button>
              </div>
              <p className="text-sm text-gray-600">
                Download detailed nutritional information in Excel format for your records.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold text-gray-800">
                  {item.name}
                </h1>
                <span className="text-2xl font-bold text-green-600">
                  {formatPrice(item.price)}
                </span>
              </div>
              
              <div className="mb-4">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                  {item.category === 'food' ? 'Food' : 'Beverage'}
                </span>
              </div>
              
              <p className="text-gray-600 mb-6">
                {item.description}
              </p>

              {/* Nutrition Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-blue-600 mb-1">Energy</div>
                  <div className="text-xl font-bold text-blue-900">
                    {item.nutritionalValues.energy.value}
                    <span className="text-sm ml-1">{item.nutritionalValues.energy.unit}</span>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-green-600 mb-1">Protein</div>
                  <div className="text-xl font-bold text-green-900">
                    {item.nutritionalValues.protein.value}
                    <span className="text-sm ml-1">{item.nutritionalValues.protein.unit}</span>
                  </div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="text-sm text-yellow-600 mb-1">Carbs</div>
                  <div className="text-xl font-bold text-yellow-900">
                    {item.nutritionalValues.carbohydrates.value}
                    <span className="text-sm ml-1">{item.nutritionalValues.carbohydrates.unit}</span>
                  </div>
                </div>
              </div>

              {/* Detailed Nutrition Information */}
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Nutrition Facts
                </h2>
                <NutritionLabel 
                  nutritionalValues={item.nutritionalValues} 
                  category={item.category} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetailPage;