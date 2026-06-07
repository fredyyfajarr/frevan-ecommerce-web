import React from 'react';
import { useSelector } from 'react-redux';
import CartListItems from './CartListItems';
import { motion } from 'framer-motion';

const CartList = () => {
  const carts = useSelector((state) => state.cartState?.CartItems ?? []);

  if (carts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-12"
      >
        <svg
          className="w-24 h-24 text-primary/60 mb-6 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <h3 className="text-3xl text-center font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Duh Keranjang Kamu <br /> Masih Kosong Nih :(
        </h3>
        <p className="text-lg lg:text-xl font-semibold text-gray-500 text-center max-w-md">
          Ayo belanja makanya biar bisa flexing ke pacar baru mantan kamu
          mwehehehe :P
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {carts.map((item) => {
        return <CartListItems cartItem={item} key={item.cartId} />;
      })}
    </motion.div>
  );
};

export default CartList;
