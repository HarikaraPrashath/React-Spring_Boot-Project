import React from 'react';
import Navbar from '../../src/components/navba/navbarOther';
import Footer from '../../src/components/footer/footer';
import HeroSection from '../../src/components/hero/heroSection';
import img1 from '../assets/image/best-1.jpg';
import img2 from '../assets/image/best-2.jpg';
import img3 from '../assets/image/best-3.jpg';

function Home() {
  return (
    <div className="flex flex-col min-h-screen">

      <HeroSection/>

      {/* Main content */}
      <div className="flex-grow">
        <div className="mt px-8 py-4">
          <p className="text-4xl font-bold text-center">Best Selling</p>
          <p className="text-lg text-gray-700 text-center">
            Get in on the trend with our curated selection of best-selling styles
          </p>
        </div>

        <div className="flex justify-center items-center gap-16">
          <div className="w-72 h-80">
            <img src={img1} alt="" className="rounded-lg" />
            <div>
              <p className="text-center font-bold">Regular Fit Long Sleeve Top</p>
              <p className="font-semibold text-center">$58.34 | 5.0</p>
            </div>
          </div>
          <div className="w-72 h-80">
            <img src={img2} alt="" className="rounded-lg" />
            <div>
              <p className="text-center font-bold">Black Crop Tailored Jacket</p>
              <p className="font-semibold text-center">$58.34 | 5.0</p>
            </div>
          </div>
          <div className="w-72 h-80">
            <img src={img3} alt="" className="rounded-lg" />
            <div>
              <p className="text-center font-bold">Textured Sunset Shirt</p>
              <p className="font-semibold text-center">$58.34 | 5.0</p>
            </div>
          </div>
        </div>
      </div>
<div className='mt-56'></div>


      {/* feedback section */}

      <div className="bg-gray-100 py-10">
  <p className="text-4xl font-bold text-center text-gray-800 mb-8">Feedback Corner</p>
  <div className="container mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Feedback Card 1 */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <p className="font-bold text-4xl text-green-500 mb-4">“”</p>
        <p className="text-gray-600 mb-4">
          The t-shirt is super soft and fits perfectly! <br />
          The material feels durable, and it's great for everyday wear. <br />
          Totally worth the price!
        </p>
        <p className="text-gray-800 font-semibold text-right">– Customer</p>
      </div>
      {/* Feedback Card 2 */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <p className="font-bold text-4xl text-green-500 mb-4">“”</p>
        <p className="text-gray-600 mb-4">
          I love how versatile the shirt is! <br />
          Perfect for casual outings or even lounging at home. <br />
          Will definitely buy more!
        </p>
        <p className="text-gray-800 font-semibold text-right">– Emilli Williamson</p>
      </div>
      {/* Feedback Card 3 */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <p className="font-bold text-4xl text-green-500 mb-4">“”</p>
        <p className="text-gray-600 mb-4">
          Great value for the price. <br />
          The color doesn't fade even after multiple washes. <br />
          Highly recommended!
        </p>
        <p className="text-gray-800 font-semibold text-right">– Alex Johnson</p>
      </div>
    </div>
  </div>
</div>


      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
