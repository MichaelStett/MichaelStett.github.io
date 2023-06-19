import ReactDOM from 'react-dom/client';

import './styles/output.css';

import React from 'react';
import {
  createHashRouter,
  RouterProvider
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import TablePage from './pages/TablePage';
import DetailsPageContainer from './components/Smart/DetailsPageContainer';

const router = createHashRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/table/:search",
    element: <TablePage />,
  },
  {
    path: "/table/:search/:itemId/",
    element: <TablePage />,
  },
  {
    path: "/table/:search/:itemId/details",
    element: <DetailsPageContainer />,
  },

]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);