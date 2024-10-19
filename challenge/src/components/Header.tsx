"use client";

import React from 'react';
import Image from 'next/image';
import logo from '../public/logo.svg';
import Cart from './Cart';

const Header: React.FC = () => {
  return (
    <header className="bg-[#232323] px-[41px] py-[33px] flex justify-between items-center border-b border-b-gray-600">
      <Image src={logo} alt="Logo starsoft" width={101} height={38} />
      <Cart />
    </header>
  );
};

export default Header;
