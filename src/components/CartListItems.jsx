import { generateSelectAmount, priceFormat } from '../utils';
import { FaTrash } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import {
  editItem,
  removeItem,
  fetchCartFromBackend,
  removeCartItemFromBackend,
} from '../features/cartSlice';
import { motion } from 'framer-motion';
import customAPI from '../api';
import { toast } from 'react-toastify';

const CartListItems = ({ cartItem }) => {
  const { cartId, name, price, image, amount, stock } = cartItem;
  const user = useSelector((state) => state.userState.user);

  const dispatch = useDispatch();

  const handleAmount = async (e) => {
    const newQuantity = parseInt(e.target.value);

    if (!cartId) {
      console.error('Cart ID is missing');
      return;
    }

    dispatch(editItem({ cartId, amount: newQuantity }));
    if (!user) return;

    try {
      // Update backend dulu
      await customAPI.put(`cart/${cartId}`, { quantity: newQuantity });

      // Update Redux setelah backend berhasil
      dispatch(fetchCartFromBackend()); // Ambil cart terbaru dari backend
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity');
    }
  };

  const removeItemCart = async () => {
    if (!cartId) {
      console.error('Cart ID is missing');
      return;
    }
    dispatch(removeItem({ cartId }));
    if (!user) return;
    try {
      await dispatch(removeCartItemFromBackend(cartId)).unwrap();
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Failed to remove item');
      dispatch(fetchCartFromBackend());
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="mb-8 p-4 md:p-6 flex flex-col md:flex-row items-center gap-6 border-b border-gray-200"
      key={cartId}
    >
      {/* Image Container */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="w-full md:w-auto flex justify-center"
      >
        <img
          src={image}
          alt={name}
          className="w-56 h-56 md:w-48 md:h-48 rounded-lg object-cover"
        />
      </motion.div>

      {/* Product Details */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 flex-1">
        <div className=" md:text-left">
          <h2 className="text-xl md:text-2xl font-bold capitalize mb-2">
            {name || 'Loading...'}{' '}
            {/* Tampilan sementara jika name masih undefined */}
          </h2>
          <p className="text-gray-600 mb-2">Quantity: {amount}</p>
          <p className="text-2xl font-bold text-primary">
            {priceFormat(price * amount)}
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-3 md:ml-auto">
          <select
            name="amount"
            className="select select-bordered w-32 text-center"
            value={amount}
            onChange={handleAmount}
          >
            {generateSelectAmount(stock)}
          </select>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-error btn-sm w-32 flex items-center gap-2 text-white"
            onClick={removeItemCart}
          >
            <FaTrash className="w-4 h-4" />
            <span>Remove</span>
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
};

export default CartListItems;
