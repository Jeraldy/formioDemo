import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Product from './pages/Product';
import ListProductCategory from './pages/Product/ListProductCategory';
import ListProductSubCategory from './pages/Product/ListProductSubCategory';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/product",
    element: <Product />,
  },
  {
    path: "/product/category",
    element: <ListProductCategory />,
  },
  {
    path: "/product/subcategory",
    element: <ListProductSubCategory />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

