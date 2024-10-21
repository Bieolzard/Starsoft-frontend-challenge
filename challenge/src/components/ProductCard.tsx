"use client";

import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '@/store/cartSlice';
import Image from 'next/image';
import eth from '@/public/Ellipse 770.svg';
import '../styles/components/_productCard.scss';
import { motion } from 'framer-motion';

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, image, title, description, price }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem({ id, image, title, description, price, quantity: 1 }));
  };

  return (
    <motion.div 
      className="product-card"
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
  <div className="product-card__image-container">
      <Image className='rounded'
          src={image} 
          alt={title} 
          width={217} // Ajuste o valor conforme necessário
          height={217} // Ajuste o valor conforme necessário
          ></Image>
  </div>
  <div className="product-card__details">
    <h2>{title}</h2>
    <p>{description}</p>
    <div className="price">
      <Image src={eth} alt="Moeda" />
      <span>{price} ETH</span>
    </div>
    <motion.button
      onClick={handleAddToCart}
      className="add-to-cart"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Comprar
    </motion.button>
  </div>
</motion.div>

  );
};

export default ProductCard;
