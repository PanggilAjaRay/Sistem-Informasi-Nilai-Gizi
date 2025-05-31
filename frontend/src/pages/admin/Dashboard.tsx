import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Plus, Download } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/common/Layout';
import Button from '../../components/ui/Button';
import { mockFoodItems } from '../../data/mockData';
import { FoodItem } from '../../types';
import AdminFoodList from './AdminFoodList';
import FoodForm from '../../components/admin/FoodForm';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<FoodItem[]>([...mockFoodItems]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<FoodItem | undefined>(undefined);
  
  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/login\" replace />;
  }
  
  const handleAddItem = (newItem: FoodItem) => {
    setItems([...items, newItem]);
    setShowForm(false);
  };
  
  const handleUpdateItem = (updatedItem: FoodItem) => {
    setItems(items.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    ));
    setEditingItem(undefined);
    setShowForm(false);
  };
  
  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };
  
  const handleEditItem = (item: FoodItem) => {
    setEditingItem(item);
    setShowForm(true);
  };
  
  const exportToExcel = () => {
    // In a real application, this would generate an Excel file
    // For this demo, we'll just create a CSV string
    const headers = [
      'ID',
      'Name',
      'Category',
      'Price',
      'Energy',
      'Protein',
      'Carbohydrates',
      'Sugar',
      'Fat',
      'Salt',
    ].join(',');
    
    const rows = items.map(item => {
      return [
        item.id,
        item.name,
        item.category,
        item.price,
        item.nutritionalValues.energy.value,
        item.nutritionalValues.protein.value,
        item.nutritionalValues.carbohydrates.value,
        item.nutritionalValues.sugar.value,
        item.nutritionalValues.fat.value,
        item.nutritionalValues.salt?.value || '-',
      ].join(',');
    });
    
    const csvContent = [headers, ...rows].join('\n');
    
    // Create a blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'nutrisurvey_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <div className="flex space-x-4">
            <Button
              onClick={exportToExcel}
              variant="secondary"
            >
              <Download size={16} className="mr-2" /> Export to Excel
            </Button>
            <Button
              onClick={() => {
                setEditingItem(undefined);
                setShowForm(true);
              }}
            >
              <Plus size={16} className="mr-2" /> Add New Item
            </Button>
          </div>
        </div>
        
        {showForm ? (
          <div className="mb-8">
            <FoodForm
              initialData={editingItem}
              onSubmit={editingItem ? handleUpdateItem : handleAddItem}
              onCancel={() => {
                setShowForm(false);
                setEditingItem(undefined);
              }}
            />
          </div>
        ) : (
          <AdminFoodList
            items={items}
            onEdit={handleEditItem}
            onDelete={handleDeleteItem}
          />
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;