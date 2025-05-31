import React from 'react';
import Layout from '../components/common/Layout';

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">About NutriSurvey</h1>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 text-lg mb-4">
              NutriSurvey is dedicated to providing accurate and comprehensive nutritional information 
              for foods and beverages available at Alun Alun Kidul Yogyakarta. Our mission is to promote 
              nutritional awareness and help visitors make informed decisions about the food they consume.
            </p>
            <p className="text-gray-600 text-lg">
              We believe that understanding the nutritional content of traditional foods and beverages 
              is essential for maintaining a healthy lifestyle while enjoying the culinary treasures 
              of Yogyakarta.
            </p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Collection</h2>
            <p className="text-gray-600 text-lg mb-4">
              Our team works closely with food vendors at Alun Alun Kidul to collect accurate 
              information about the ingredients and preparation methods of their offerings. We then 
              analyze this information to provide detailed nutritional breakdowns.
            </p>
            <p className="text-gray-600 text-lg">
              All nutritional values are calculated using standardized methods and are regularly 
              updated to ensure accuracy. While we strive for precision, please note that actual 
              nutritional content may vary slightly based on portion size and preparation methods.
            </p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About Alun Alun Kidul</h2>
            <p className="text-gray-600 text-lg mb-4">
              Alun Alun Kidul (Southern Square) is one of Yogyakarta's most popular gathering places, 
              located near the Sultan's Palace (Kraton). This vibrant area is known for its various 
              traditional food stalls and vendors offering a wide range of local delicacies.
            </p>
            <p className="text-gray-600 text-lg">
              Visitors can enjoy everything from savory dishes like Gudeg and Bakso to sweet treats 
              and traditional beverages. The square comes alive especially in the evenings, offering 
              a true taste of Yogyakarta's culinary heritage.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
            <p className="text-gray-600 text-lg mb-4">
              Have questions, suggestions, or feedback? We'd love to hear from you!
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2"><strong>Email:</strong> info@nutrisurvey.id</p>
              <p className="text-gray-700 mb-2"><strong>Phone:</strong> +62 812 3456 7890</p>
              <p className="text-gray-700"><strong>Address:</strong> Alun Alun Kidul, Yogyakarta, Indonesia</p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;