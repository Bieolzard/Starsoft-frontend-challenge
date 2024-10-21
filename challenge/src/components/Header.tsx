"use client";

import React from 'react';
import Image from 'next/image';
import logo from '../public/logo.svg';
import Cart from './Cart';
import '../styles/components/_header.scss'; // Importando o estilo Sass

const Header: React.FC = () => {
  return (
    <header className="header">
      <Image src={logo} alt="Logo starsoft"/>
      <Cart />
    </header>
  );
};

export default Header;
