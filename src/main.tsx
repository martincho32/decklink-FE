import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import App from './App';
import Sample from './Sample';
import { NotFound } from './pages';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Sample />,
    errorElement: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
