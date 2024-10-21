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
import '../styles/pages/_home.scss';
import { motion } from 'framer-motion';


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
      <main className="product-grid">
        {allProducts.slice(0, visibleProducts).map((product) => (
          <motion.div
          key={product.id}
            initial={{ opacity: 0, y: 20 }} // Início invisível e abaixo
            animate={{ opacity: 1, y: 0 }} // Fica visível na posição original
            exit={{ opacity: 0, y: -20 }} // Desaparece e sobe um pouco
            transition={{ duration: 0.3, ease: "easeInOut" }} > 
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            description={product.description}
            price={product.price}
          />
          </motion.div>
        ))}
      </main>
      <div className="load-more-container">
        <div className="progress-bar">
          <motion.div className="progress" 
            initial={{ width: 0 }} // Inicia a animação com 0%
            animate={{ width: `${progress}%` }} // Anima para a largura do progresso
            transition={{ duration: 0.5 }} // Duração da animação
            style={{ width: `${progress}%` }}></motion.div>
        </div>
        <motion.button
          className="load-more-button"
          onClick={loadMore}
          whileHover={{ scale: 1.05 }} // Aumenta um pouco ao passar o mouse
          whileTap={{ scale: 0.95 }} // Diminui um pouco ao clicar
          transition={{ duration: 0.2 }} // Suavidade da animação
        >
          {isAllShown ? 'Você já viu tudo!' : 'Carregar mais'}
        </motion.button>
      </div>
      <div className="footer">
        <p className="footer-text">STARSOFT © TODOS OS DIREITOS RESERVADOS</p>
      </div>
    </div>
  );
};

export default HomePage;
