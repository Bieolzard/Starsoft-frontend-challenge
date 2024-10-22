"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import '../styles/pages/_home.scss';
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import { fetchProducts } from '@/services/api'; // Certifique-se de que o caminho está correto
import { Product } from '@/interfaces/Product'; // Certifique-se de que a interface Product está definida corretamente

const HomePage = () => {
  const [visibleProducts, setVisibleProducts] = useState<number>(8);
  const [isAllShown, setIsAllShown] = useState<boolean>(false);

  const { data: products = [], isLoading, isError } = useQuery<Product[], Error>('products', fetchProducts);

  const loadMore = () => {
    if (visibleProducts >= products.length) {
      setIsAllShown(true);
    } else {
      setVisibleProducts((prev) => prev + 4);
    }
  };

  const progress = Math.min((visibleProducts / products.length) * 100, 100);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  return (
    <div>
      <Header />
      <main className="product-grid">
        {products.slice(0, visibleProducts).map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}  
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }} 
            transition={{ duration: 0.3, ease: "easeInOut" }} 
          > 
            <ProductCard key={product.id} {...product} />
          </motion.div>
        ))}
      </main>
      <div className="load-more-container">
        <div className="progress-bar">
          <motion.div className="progress" 
            initial={{ width: 0 }} 
            animate={{ width: `${progress}%` }} 
            transition={{ duration: 0.5 }}
            style={{ width: `${progress}%` }} 
          />
        </div>
        <motion.button
          className="load-more-button"
          onClick={loadMore}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }} 
          transition={{ duration: 0.2 }}
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
