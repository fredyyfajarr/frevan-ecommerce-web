import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CartProvider } from './context/CartContext';
import PublicLayouts from './Layouts/PublicLayouts';
import ErrorView from './page/ErrorView';
import { fetchCartFromBackend } from './features/cartSlice';
import { store } from './store';

const lazyPage = (importer) => async () => {
  const module = await importer();
  return {
    Component: module.default,
    loader: module.loader,
  };
};

const lazyStorePage = (importer) => async () => {
  const module = await importer();
  return {
    Component: module.default,
    loader: module.loader?.(store),
  };
};

const lazyComponent = (importer) => async () => {
  const module = await importer();
  return { Component: module.default };
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayouts />,
    errorElement: <ErrorView />,
    children: [
      {
        index: true,
        lazy: lazyPage(() => import('./page/HomeView')),
      },
      {
        path: 'products',
        lazy: lazyPage(() => import('./page/ProductView')),
      },
      {
        path: 'product/create',
        lazy: lazyStorePage(() => import('./page/CreateProductView')),
      },
      {
        path: 'product/:id/edit',
        lazy: lazyStorePage(() => import('./page/EditProductView')),
      },
      {
        path: 'product/:id',
        lazy: lazyComponent(() => import('./page/DetailProduct')),
      },
      {
        path: 'order',
        lazy: lazyStorePage(() => import('./page/OrderView')),
      },
      {
        path: 'checkout',
        lazy: lazyStorePage(() => import('./page/CheckoutView')),
      },
      {
        path: 'carts',
        lazy: lazyComponent(() => import('./page/CartView')),
      },
      {
        path: 'abouts',
        lazy: lazyComponent(() => import('./page/AboutView')),
      },
      {
        path: 'profile/:id',
        lazy: lazyStorePage(() => import('./page/ProfileView')),
      },
      {
        path: 'profile/:id/edit',
        lazy: lazyStorePage(() => import('./page/EditProfileView')),
      },
      {
        path: 'profile/:id/change-password',
        lazy: lazyStorePage(() => import('./page/EditPasswordView')),
      },
      {
        path: 'wishlist',
        lazy: lazyComponent(() => import('./page/Wishlist')),
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.user);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchCartFromBackend())
        .unwrap()
        .catch(() => {});
    }
  }, [user?._id, dispatch]);

  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;