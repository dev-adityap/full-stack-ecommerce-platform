import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const sampleProducts = [
  // --- ELECTRONICS ---
  {
    name: 'Acer Aspire 5 Slim Laptop',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
    description: 'High-performance laptop for coding and daily tasks',
    brand: 'Acer',
    category: 'Electronics',
    price: 54999,
    countInStock: 10,
  },
  {
    name: 'Wireless Earbuds Pro',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500',
    description: 'Active noise cancellation with crystal clear sound',
    brand: 'SoundBeast',
    category: 'Electronics',
    price: 1799,
    countInStock: 25,
  },
  {
    name: 'Smart Watch Elite',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    description: 'Track your fitness, heart rate, and notifications on the go',
    brand: 'TimeTech',
    category: 'Electronics',
    price: 12999,
    countInStock: 15,
  },
  {
    name: '4K Ultra HD Monitor',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500',
    description: '27-inch IPS display with vibrant colors and HDR support',
    brand: 'VisionPro',
    category: 'Electronics',
    price: 24999,
    countInStock: 8,
  },
  {
    name: 'Bluetooth Portable Speaker',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
    description: 'Waterproof rugged speaker with deep bass and 12-hour battery',
    brand: 'SonicPulse',
    category: 'Electronics',
    price: 3999,
    countInStock: 22,
  },

  // --- FOOTWEAR ---
  {
    name: 'Classic Casual Sneakers',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    description: 'Comfortable everyday streetwear sneakers',
    brand: 'UrbanStride',
    category: 'Footwear',
    price: 2999,
    countInStock: 30,
  },
  {
    name: 'Running Sports Shoes',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500',
    description: 'Lightweight cushioning for marathon runners and athletes',
    brand: 'AeroFit',
    category: 'Footwear',
    price: 3499,
    countInStock: 18,
  },
  {
    name: 'Formal Leather Oxford Shoes',
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=500',
    description: 'Handcrafted genuine leather shoes for office and formal events',
    brand: 'LuxeStep',
    category: 'Footwear',
    price: 4499,
    countInStock: 12,
  },

  // --- FASHION ---
  {
    name: 'Men Kurta Traditional Wear',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=500',
    description: 'Elegant ethnic wear for festive occasions and celebrations',
    brand: 'Vastra',
    category: 'Fashion',
    price: 1899,
    countInStock: 12,
  },
  {
    name: 'Casual Denim Jacket',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500',
    description: 'Classic vintage blue denim jacket with comfortable lining',
    brand: 'DenimCo',
    category: 'Fashion',
    price: 2799,
    countInStock: 20,
  },
  {
    name: 'Slim Fit Cotton Chinos',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500',
    description: 'Versatile stretchable trousers for casual and smart-casual looks',
    brand: 'FlexFit',
    category: 'Fashion',
    price: 1599,
    countInStock: 25,
  },

  // --- ACCESSORIES ---
  {
    name: 'Mechanical Gaming Keyboard',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
    description: 'RGB backlit mechanical keyboard with tactile switches',
    brand: 'KeyPro',
    category: 'Accessories',
    price: 4999,
    countInStock: 20,
  },
  {
    name: 'Minimalist Leather Wallet',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500',
    description: 'Genuine leather slim wallet with RFID protection',
    brand: 'LuxeCraft',
    category: 'Accessories',
    price: 999,
    countInStock: 40,
  },
  {
    name: 'Stainless Steel Chronograph Watch',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500',
    description: 'Sophisticated metal strap watch with water resistance',
    brand: 'Chronos',
    category: 'Accessories',
    price: 6999,
    countInStock: 14,
  }
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(sampleProducts);
    console.log('📦 Expanded Product Catalog Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error with data import: ${error}`);
    process.exit(1);
  }
};

importData();