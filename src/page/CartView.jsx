import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import CartList from '../components/CartList';
import CartTotal from '../components/CartTotal';
import AuthModal from '../components/AuthModal';
import { useDispatch } from 'react-redux';
import { fetchCartFromBackend } from '../features/cartSlice';

const CartView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const user = useSelector((state) => state.userState.user);
  const numItemInCart = useSelector((state) => state.cartState.numItemsInCart);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchCartFromBackend()); // Ambil ulang cart dari backend setelah login
    }
  }, [user?._id, dispatch]);

  const handleLoginClick = (e) => {
    e.preventDefault();
    setIsRegister(false);
    setShowAuthModal(true);
  };

  if (numItemInCart === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-[70vh] flex flex-col items-center justify-center px-4"
      >
        <h1 className="text-4xl md:text-5xl text-center font-bold text-gray-800 mb-6">
          Your Cart is Empty
        </h1>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
          Looks like you haven't added any items to your cart yet.
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/products"
            className="btn btn-primary px-8 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-8 max-w-7xl"
      >
        <div className="border-b border-primary pb-6 mb-8">
          <motion.h2
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="pb-5 md:pb-3 lg:pb-4 sm:pb-0 text-4xl md:text-5xl text-center font-bold capitalize bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            Shopping Cart
          </motion.h2>
          <p className="text-lg text-center text-gray-600 mt-3 sm:mt-0 ">
            {numItemInCart} {numItemInCart === 1 ? 'item' : 'items'} in your
            cart
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <motion.div
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="lg:col-span-8"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <CartList />
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 20 }}
            animate={{ x: 0 }}
            className="lg:col-span-4"
          >
            <div className="bg-white rounded-xl shadow-lg p-8 sticky top-4">
              <h3 className="text-2xl font-semibold mb-6">Order Summary</h3>
              <CartTotal />
              {user ? (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/checkout"
                    className="btn btn-primary btn-block text-lg py-2 mt-8 font-medium text-center shadow-md hover:shadow-lg transition-all"
                  >
                    <span className="text-center mb-3">
                      Proceed to Checkout
                    </span>
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    onClick={handleLoginClick}
                    className="btn btn-primary btn-block text-lg py-0 mt-3 font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <span>Login to Checkout</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {!user && (
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
            isRegister={isRegister}
          />
        )}
      </motion.div>
    </>
  );
};

export default CartView;
