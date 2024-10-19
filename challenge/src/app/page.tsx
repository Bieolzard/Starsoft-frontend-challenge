"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import produto1 from '@/public/prod1.svg';
import produto2 from '@/public/prod2.svg';
import produto3 from '@/public/prod3.svg';
import produto4 from '@/public/prod4.svg';
import produto5 from '@/public/prod5.svg';
import produto6 from '@/public/prod6.svg';
import produto7 from '@/public/prod7.svg';
import produto8 from '@/public/prod8.svg';

const allProducts = [
  { id: '1', image: produto1, title: 'Lorem Ipsum 1', description: 'Redesigned from scratch and completely revised.', price: 32 },
  { id: '2', image: produto2, title: 'Lorem Ipsum 2', description: 'Redesigned from scratch and completely revised.', price: 12 },
  { id: '3', image: produto3, title: 'Lorem Ipsum 3', description: 'Redesigned from scratch and completely revised.', price: 32 },
  { id: '4', image: produto4, title: 'Lorem Ipsum 4', description: 'Redesigned from scratch and completely revised.', price: 32 },
  { id: '5', image: produto5, title: 'Lorem Ipsum 5', description: 'Redesigned from scratch and completely revised.', price: 32 },
  { id: '6', image: produto6, title: 'Lorem Ipsum 6', description: 'Redesigned from scratch and completely revised.', price: 32 },
  { id: '7', image: produto7, title: 'Lorem Ipsum 7', description: 'Redesigned from scratch and completely revised.', price: 32 },
  { id: '8', image: produto8, title: 'Lorem Ipsum 8', description: 'Redesigned from scratch and completely revised.', price: 32 },
];

const HomePage = () => {
  const [visibleProducts, setVisibleProducts] = useState<number>(4);
  const [isAllShown, setIsAllShown] = useState<boolean>(false);

  const loadMore = () => {
    if (visibleProducts >= allProducts.length) {
      setIsAllShown(true);
    } else {
      setVisibleProducts((prev) => prev + 4);
    }
  };

  const progress = Math.min((visibleProducts / allProducts.length) * 100, 100);

  return (
    <div>
      <Header />
      <main className="px-[136.5px] mt-[189px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
        {allProducts.slice(0, visibleProducts).map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            description={product.description}
            price={product.price}
          />
        ))}
      </main>
      <div className="px-[136.5px] text-center mt-[20px] mb-[214px]">
        <div className="max-w-[403px] bg-gray-200 mx-auto rounded-full h-2.5 mb-4 mt-[189px]">
          <div className="bg-[#FF8310] h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        <button
          className="bg-[#FF8310] text-white text-center py-[30px] px-[151px] rounded mt-[11px]"
          onClick={loadMore}
        >
          {isAllShown ? 'Você já viu tudo!' : 'Carregar mais'}
        </button>
      </div>
      <div className='flex justify-center text-center'>
        <p className='mx-auto text-[#FFFFFF70] text-[14px] mb-[25px]'>STARSOFT © TODOS OS DIREITOS RESERVADOS</p>
      </div>
    </div>
  );
};

export default HomePage;
