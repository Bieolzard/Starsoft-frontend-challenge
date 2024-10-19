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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={cartRef}>
      <div className="flex text-center justify-center cursor-pointer" onClick={toggleCart}>
        <Image src={cart} alt="Logo starsoft" width={33} height={33} />
        <span className="flex text-white text-center self-center ml-[13px]">
          {items.reduce((total, item) => total + item.quantity, 0)}
        </span>
      </div>
      {isOpen && (
        <div className="absolute right-16 mt-6 pt-[63px] px-[30px] w-[697px] rounded-lg shadow-lg z-50 bg-[#232323]">
          <div className='flex mb-[164.5px]'>
            <div className='bg-[#373737] p-3 rounded-full ml-[70px]'>
              <Image src={backArrow} alt="" />
            </div>
            <h1 className='text-white text-[24px] ml-[84px] text-nowrap'>Mochila de Compras</h1>
          </div>
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.id} className="rounded-lg py-[19.5px] px-[30px] bg-[#2B2B2B] shadow-lg mb-4 flex flex-col">
                <div className='flex items-center'>
                  <div className='bg-[#22232C] rounded-lg w-[161px] min-h-[161px]'>
                    <Image src={item.image} alt={item.title} className="mx-auto my-auto" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="text-lg text-white font-bold">{item.title}</h4>
                    <p className="text-[#CCCCCC] font-sans text-xs font-light">{item.description}</p>
                    <div className="flex items-center mt-[10px]">
                      <Image src={eth} alt="Moeda" width={29} height={29} />
                      <span className="ml-[10px] text-xl font-bold uppercase">{item.price} ETH</span>
                    </div>
                    <div className="flex items-center mt-[16px]">
                      <div className="bg-[#232323] flex justify-between text-white py-[14.5px] px-2 rounded-lg">
                        <button onClick={() => handleIncrement(item.id)} className="mr-[34.4px]">+</button>
                        <span className="">{item.quantity}</span>
                        <button onClick={() => handleDecrement(item.id)} className="ml-[34.4px]">-</button>
                      </div>
                      <button onClick={() => handleRemove(item.id)} className="ml-auto bg-[#FF8310] text-white p-3 rounded-full">
                        <Image src={removeIcon} alt="remover produto do carrinho"></Image>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="p-4 text-center text-gray-500">Seu carrinho está vazio.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart