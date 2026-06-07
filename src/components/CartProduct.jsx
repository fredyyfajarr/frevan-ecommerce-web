import React from 'react';
import { Link } from 'react-router-dom';
import { priceFormat } from '../utils';
import { FaTrash, FaPencilAlt, FaShoppingCart, FaHeart } from 'react-icons/fa';
import customAPI from '../api';
import { toast } from 'react-toastify';
import { useRevalidator } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, fetchCartFromBackend, removeItem } from '../features/cartSlice';
import { addToWishlist, removeFromWishlist } from '../features/wishlistSlice';

const CartProduct = ({ product, user, className }) => {
  const { revalidate } = useRevalidator();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const isInWishlist = wishlist.some((item) => item.productId === product._id);

  const handleAddToCart = async () => {
    const productCart = {
      cartId: product._id + product.name,
      productId: product._id,
      image: product.image,
      name: product.name,
      price: product.price,
      stock: product.stock,
      amount: 1, // Set default amount to 1
    };

    // Simpan ke Redux & localStorage
    dispatch(addItem({ product: productCart }));
    if (!user) return;

    try {
      // Kirim data cart ke backend (update jika produk sudah ada)
      await customAPI.post('/cart', {
        items: [{ product: product._id, quantity: 1, price: product.price }],
      });
      dispatch(fetchCartFromBackend());
    } catch (error) {
      dispatch(removeItem({ cartId: productCart.cartId }));
      console.error('Error saving to backend:', error);
      toast.error('Failed to save cart to backend');
    }
  };

  const handleDelete = async () => {
    await customAPI.delete(`/product/${product._id}`);
    toast.info('Delete product successfully');
    revalidate();
  };

  const confirmDeleteProduct = () => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete this product?</p>
          <button
            onClick={() => {
              handleDelete();
              closeToast();
            }}
            className="btn btn-danger"
          >
            Yes
          </button>
          <button onClick={closeToast} className="btn btn-secondary">
            No
          </button>
        </div>
      ),
      { autoClose: false }
    );
  };

  const handleToggleWishlist = () => {
    const productWishlist = {
      productId: product._id,
      image: product.image,
      name: product.name,
      price: product.price,
    };

    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id));
      toast.success('Removed from wishlist');
    } else {
      dispatch(addToWishlist(productWishlist));
      toast.success('Added to wishlist');
    }
  };

  return (
    <div className={className}>
      <div
        className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
        key={product._id}
      >
        <figure className="relative overflow-hidden group aspect-[4/3] flex items-center justify-center bg-white p-4">
          <img
            src={product.image}
            alt={product.name}
            className={`w-auto h-auto max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110 ${
              product.stock < 1 ? 'opacity-50' : ''
            }`}
          />
          {product.stock < 1 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-full h-full bg-black/20 backdrop-blur-sm"></div>
              <div className="transform rounded-xl bg-red-700 text-white py-2 px-8 shadow-xl">
                <span className="font-bold text-xl tracking-wider animate-pulse">
                  SOLD OUT
                </span>
              </div>
            </div>
          )}
        </figure>
        <div className="card-body">
          {user && user.role === 'owner' && (
            <div className="flex justify-end gap-x-3">
              <FaTrash
                onClick={confirmDeleteProduct}
                className="text-red-500 cursor-pointer hover:text-red-700 transition-colors duration-200 text-xl"
              />
              <Link to={`/product/${product._id}/edit`}>
                <FaPencilAlt className="text-info cursor-pointer hover:text-blue-600 transition-colors duration-200 text-xl" />
              </Link>
            </div>
          )}
          <div className="absolute top-4 right-4">
            <button
              onClick={handleToggleWishlist}
              className="btn btn-circle btn-ghost"
            >
              <FaHeart
                className={`text-xl ${
                  isInWishlist ? 'text-red-500' : 'text-gray-400'
                }`}
              />
            </button>
          </div>
          <h2 className="card-title text-primary hover:text-primary-focus transition-colors duration-200">
            {product.name}
          </h2>
          <p className="font-bold text-accent text-xl">
            {priceFormat(product.price)}
          </p>
          <p className="text-gray-600">
            {product.description.substring(0, 50)}...
          </p>
          <div className="card-actions justify-end mt-4 flex items-center gap-2">
            <button
              onClick={handleAddToCart}
              disabled={product.stock < 1}
              className="btn btn-circle btn-primary hover:scale-105 transition-transform duration-200"
              title="Add to Cart"
            >
              <FaShoppingCart className="text-xl" />
            </button>
            <Link
              to={`/product/${product._id}`}
              className="btn btn-primary hover:scale-105 transition-transform duration-200 rounded-full"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
