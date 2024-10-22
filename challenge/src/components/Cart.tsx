"use client";

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { incrementItem, decrementItem, removeItem, clearCart } from '@/store/cartSlice';
import Image from 'next/image';
import eth from '@/public/Ellipse 770.svg';
import removeIcon from '@/public/lixeira.svg';
import cart from '../public/Bag.svg';
import backArrow from '../public/arrow.svg';
import '../styles/components/_cart.scss';
import { motion } from 'framer-motion';

const Cart: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const handleIncrement = (id: string) => {
    dispatch(incrementItem(id));
  };

  const handleDecrement = (id: string) => {
    dispatch(decrementItem(id));
  };

  const handleRemove = (id: string) => {
    dispatch(removeItem(id));
  };

  const handlePurchase = () => {
    setPurchaseCompleted(true);
    dispatch(clearCart());
  };

  const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);

  
  useEffect(() => {
    if (items.length > 0) {
      setPurchaseCompleted(false);
    }
  }, [items]);

  return (
    <div className="cart__container">
      <motion.div 
        className="cart__toggle" 
        onClick={toggleCart} 
        whileHover={{ scale: 1.1 }} 
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Image src={cart} alt="carrinho de compras" width={33} height={33} />
        <span>{items.reduce((total, item) => total + item.quantity, 0)}</span>
      </motion.div>
      {isOpen && (
        <motion.div 
          className="cart__content"
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          exit={{ opacity: 0, scale: 0.8 }} 
          transition={{ duration: 0.3 }} 
        >
          <div className="cart__content__header">
            <motion.div 
              className="cart__content__header-back" 
              onClick={toggleCart}
              whileHover={{ scale: 1.1 }} 
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image src={backArrow} alt="fechar carrinho" />
            </motion.div>
            <h1 className="cart__content__header-title">Mochila de Compras</h1>
          </div>
          {items.length > 0 ? (
            <>
              {items.map((item) => (
                <motion.div 
                  key={item.id} 
                  className="cart-item"
                  initial={{ opacity: 1, y: 0 }} 
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }} 
                  transition={{ duration: 0.3, ease: "easeInOut" }} 
                >
                  <div className="cart-item__image">
                    <Image src={item.image} alt={item.title} width={190} height={190} />
                  </div>
                  <div className="cart-item__details">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                    <div className="price">
                      <Image src={eth} alt="Moeda" width={29} height={29} />
                      <span>{item.price} ETH</span>
                    </div>
                    <div className="quantity">
                      <div className="quantity-controls">
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }} 
                          onClick={() => handleDecrement(item.id)}>-</motion.button>
                        <span>{item.quantity}</span>
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }} 
                          onClick={() => handleIncrement(item.id)}>+</motion.button>
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleRemove(item.id)} 
                        className="remove"
                      >
                        <Image src={removeIcon} alt="remover produto do carrinho" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
              <div className="total">
                <h3>Total</h3>
                <div className="total-amount">
                  <Image src={eth} alt="Moeda" width={34} height={34} />
                  <span>{totalAmount} ETH</span>
                </div>
              </div>
              {purchaseCompleted ? (
                <button className="checkout-button" disabled>
                  Compra finalizada!
                </button>
              ) : (
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="checkout-button"
                  onClick={handlePurchase}
                >
                  Finalizar Compra
                </motion.button>
              )}
            </>
          ) : (
            <p className="empty-message">Seu carrinho está vazio.</p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
