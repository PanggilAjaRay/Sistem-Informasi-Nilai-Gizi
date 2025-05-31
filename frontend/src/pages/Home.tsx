import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import FoodCard from '../components/ui/FoodCard';
import Layout from '../components/common/Layout';
import { getFeaturedFoods, getFeaturedBeverages } from '../services/api';

const Home: React.FC = () => {
  const [featuredItems, setFeaturedItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchFeaturedItems = async () => {
      try {
        setLoading(true);
        // Fetch both featured foods and beverages
        const [foods, beverages] = await Promise.all([
          getFeaturedFoods(),
          getFeaturedBeverages()
        ]);
        
        // Combine and limit to 6 items
        const combined = [...foods, ...beverages].slice(0, 6);
        setFeaturedItems(combined);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching featured items:', err);
        setError('Failed to load featured items. Please try again later.');
        setLoading(false);
      }
    };

    fetchFeaturedItems();
  }, []);
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative text-white h-[500px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://t-2.tstatic.net/jogja/foto/bank/images/Sejarah-Alun-Alun-Selatan-Yogyakarta-atau-Alun-Alun-Kidul.jpg')",
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Temukan Informasi Nutrisi Makanan Lokal
            </h1>
            <p className="text-xl mb-8 text-gray-100">
              Temukan informasi nutrisi tentang berbagai makanan dan minuman yang tersedia di Alun Alun Kidul Yogyakarta.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/foods"
                className="px-6 py-3 bg-white text-green-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Jelajahi Makanan
              </Link>
              <Link
                to="/beverages"
                className="px-6 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-green-600 transition-colors"
              >
                Jelajahi Minuman
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Tentang NutriSurvey</h2>
            <p className="text-lg text-gray-600 mb-8">
              NutriSurvey memberikan informasi nutrisi yang lengkap tentang makanan dan minuman tradisional
              yang tersedia di Alun Alun Kidul Yogyakarta. Tujuan kami adalah untuk membantu Anda membuat keputusan
              yang informasi tentang makanan yang Anda konsumsi.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Featured Items</h2>
            <Link 
              to="/foods" 
              className="flex items-center text-green-500 hover:text-green-600 font-medium"
            >
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              // Loading skeleton
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                  <div className="h-48 bg-gray-300 rounded-md mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))
            ) : error ? (
              <div className="col-span-3 text-center py-8">
                <p className="text-red-500">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg"
                >
                  Try Again
                </button>
              </div>
            ) : featuredItems.length > 0 ? (
              featuredItems.map((item) => (
                <FoodCard key={item.id} item={item} />
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-500">No featured items available.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;