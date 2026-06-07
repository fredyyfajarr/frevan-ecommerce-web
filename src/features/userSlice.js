import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const user = {
        ...action.payload.data,
        token: action.payload.token,
      };
      // set value from state
      state.user = user;
      // set local storage
      localStorage.setItem('user', JSON.stringify(user));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('cart');
      toast.success('Logout Success');
    },
    registerUser: (state, action) => {
      const user = {
        ...action.payload.data,
        token: action.payload.token,
      };
      state.user = user;
      // set local storage
      localStorage.setItem('user', JSON.stringify(user));
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
  },
});

export const { loginUser, logoutUser, registerUser, setUser } =
  userSlice.actions;
export default userSlice.reducer;
