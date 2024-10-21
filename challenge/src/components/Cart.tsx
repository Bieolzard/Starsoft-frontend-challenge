"use client";

import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import cart from '../public/Bag.svg';
import backArrow from '../public/arrow.svg';
import eth from '@/public/Ellipse 770.svg';
import removeIcon from '@/public/lixeira.svg';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { incrementItem, decrementItem, removeItem } from '@/store/cartSlice';
import '../styles/components/_cart.scss';
import { motion } from 'framer-motion';

const Cart: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const cartRef = useRef<HTMLDivElement>(null);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
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

  const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="cart__container" ref={cartRef}>
  <motion.div className="cart__toggle" 
    onClick={toggleCart} 
    whileHover={{ scale: 1.1 }} // Efeito de escala ao passar o mouse
    transition={{ type: "spring", stiffness: 300 }} // Efeito suave
  >
    <Image src={cart} alt="carrinho de compras" width={33} height={33} />
    <span>
      {items.reduce((total, item) => total + item.quantity, 0)}
    </span>
  </motion.div>
  {isOpen && (
    <motion.div 
      className="cart__content"
      initial={{ opacity: 0, scale: 0.8 }} // Inicia pequeno e transparente
      animate={{ opacity: 1, scale: 1 }} // Aumenta para o tamanho original
      exit={{ opacity: 0, scale: 0.8 }} // Encolhe e fica transparente ao sair
      transition={{ duration: 0.3 }} // Duração da animação
    >
      <div className="cart__content__header">
        <motion.div className="cart__content__header-back" 
        onClick={toggleCart}
        whileHover={{ scale: 1.1 }} // Efeito de escala ao passar o mouse
        transition={{ type: "spring", stiffness: 300 }}>
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
              initial={{ opacity: 1, y: 0 }} // Início visível
                  animate={{ opacity: 1, y: 0 }} // Fica visível na posição original
                  exit={{ opacity: 0, y: -20 }} // Desaparece e se move para cima
                  transition={{ duration: 0.3, ease: "easeInOut" }} // Duração e suavidade
            >
              <div className="cart-item__image">
                <Image src={item.image} alt={item.title} />
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
                    onClick={() => handleRemove(item.id)} className="remove">
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
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="checkout-button"> Finalizar Compra
          </motion.button>
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