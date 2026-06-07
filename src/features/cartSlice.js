import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customAPI from '../api';

const defaultValue = {
  CartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  userId: null,
};

const getCartFromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('cart')) || defaultValue;
  } catch {
    return defaultValue;
  }
};

export const fetchCartFromBackend = createAsyncThunk(
  'cart/fetchCartFromBackend',
  async (_, { rejectWithValue, getState }) => {
    try {
      const user = getState().userState.user;
      if (!user?._id) return null;

      const response = await customAPI.get('/cart');
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) return null;
      return rejectWithValue(error.response?.data || 'Error fetching cart');
    }
  }
);

export const removeCartItemFromBackend = createAsyncThunk(
  'cart/removeCartItem',
  async (cartId, { rejectWithValue }) => {
    try {
      await customAPI.delete(`/cart/${cartId}`);
      return cartId;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error removing cart item');
    }
  }
);

export const clearCartFromBackend = createAsyncThunk(
  'cart/clearCartFromBackend',
  async (_, { rejectWithValue }) => {
    try {
      await customAPI.delete('/cart');
      return null;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error clearing cart');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload;
      const item = state.CartItems.find((i) => i.cartId === product.cartId);

      if (item) {
        item.amount += product.amount;
      } else {
        state.CartItems.push(product);
      }

      state.numItemsInCart += product.amount;
      state.cartTotal += product.price * product.amount;

      localStorage.setItem('cart', JSON.stringify(state));
      toast.success('Success adding product to Cart');
    },
    editItem: (state, action) => {
      const { cartId, amount } = action.payload;
      const itemProduct = state.CartItems.find((item) => item.cartId === cartId);

      if (!itemProduct) return;

      state.numItemsInCart += amount - itemProduct.amount;
      state.cartTotal += itemProduct.price * (amount - itemProduct.amount);
      itemProduct.amount = amount;

      localStorage.setItem('cart', JSON.stringify(state));
      toast.info('Cart item updated');
    },
    clearCartItem: () => {
      localStorage.removeItem('cart');
      return defaultValue;
    },
    removeItem: (state, action) => {
      const { cartId } = action.payload;
      const itemProduct = state.CartItems.find((item) => item.cartId === cartId);

      if (!itemProduct) return;

      state.CartItems = state.CartItems.filter((item) => item.cartId !== cartId);
      state.numItemsInCart -= itemProduct.amount;
      state.cartTotal -= itemProduct.price * itemProduct.amount;

      localStorage.setItem('cart', JSON.stringify(state));
      toast.success('Cart item deleted');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartFromBackend.fulfilled, (state, action) => {
        const backendCart = action.payload;
        if (!backendCart?.items) {
          localStorage.removeItem('cart');
          return defaultValue;
        }

        state.userId = backendCart.user;
        state.CartItems = backendCart.items.map((item) => ({
          cartId: item._id,
          productId: item.product?._id || null,
          name: item.product?.name || 'Unknown',
          image: item.product?.image || '',
          price: item.price,
          amount: item.quantity,
          stock: item.product?.stock || 1,
        }));

        state.numItemsInCart = backendCart.items.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
        state.cartTotal = backendCart.totalPrice;

        localStorage.setItem('cart', JSON.stringify(state));
      })
      .addCase(removeCartItemFromBackend.fulfilled, (state, action) => {
        state.CartItems = state.CartItems.filter(
          (item) => item.cartId !== action.payload
        );
        state.numItemsInCart = state.CartItems.reduce(
          (acc, item) => acc + item.amount,
          0
        );
        state.cartTotal = state.CartItems.reduce(
          (acc, item) => acc + item.price * item.amount,
          0
        );

        localStorage.setItem('cart', JSON.stringify(state));
      })
      .addCase(clearCartFromBackend.fulfilled, () => {
        localStorage.removeItem('cart');
        return defaultValue;
      });
  },
});

export const { addItem, editItem, removeItem, clearCartItem } = cartSlice.actions;
export default cartSlice.reducer;
