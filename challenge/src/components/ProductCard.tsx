"use client";

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { addItem, removeItem } from '@/store/cartSlice';
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
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isItemInCart = cartItems.some(item => item.id === id);

  const handleAddToCart = () => {
    dispatch(addItem({ id, image, title, description, price, quantity: 1 }));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeItem(id));
  };

  return (
    <motion.div 
      className="product-card"
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="product-card__image-container">
        <Image 
          className="rounded"
          src={image} 
          alt={title} 
          width={217} 
          height={217} 
        />
      </div>
      <div className="product-card__details">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="price">
          <Image src={eth} alt="Moeda" />
          <span>{price} ETH</span>
        </div>
        {isItemInCart ? (
          <button className="add-to-cart" onClick={handleRemoveFromCart} disabled>
            Adicionado ao carrinho!
          </button>
        ) : (
          <motion.button
            onClick={handleAddToCart}
            className="add-to-cart"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Comprar
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
