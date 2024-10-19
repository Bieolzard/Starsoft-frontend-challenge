"use client";

import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '@/store/cartSlice';
import Image from 'next/image';
import eth from '@/public/Ellipse 770.svg';

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
    <div className="rounded-lg py-[26px] px-[24.5px] bg-[#191A20] shadow-lg max-w-[345px] flex flex-col">
      <div className='bg-[#22232C] rounded-lg min-h-[258px] px-[24.5px] flex text-center self-center'>
        <Image src={image} alt={title} className="" />
      </div>
      <div className='text-left'>
        <h2 className="text-lg text-white font-bold mt-[49px] mb-[10px]">{title}</h2>
        <p className="text-[#CCCCCC] font-sans text-xs font-light whitespace-nowrap">{description}</p>
        <div className="flex mt-[30px]">
          <Image src={eth} alt="Moeda" />
          <span className="ml-[10px] text-xl font-bold uppercase">{price} ETH</span>
        </div>
        <button
          onClick={handleAddToCart}
          className="bg-[#FF8310] text-base uppercase text-white py-[22px] w-full mt-[24px] rounded-lg"
        >
          Comprar
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
