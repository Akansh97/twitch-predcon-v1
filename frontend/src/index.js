import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import AdminPage from './components/AdminPage';
import Leaderboard from './components/Leaderboard';
import Predictions from './components/Predictions';
import PredictResult from './components/PredictResult';
import HomePage from './components/HomePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children : [ 
      {
        path:"home",
        element : <HomePage />
      },
      {
      path:"predict",
      element : <Predictions />
      },
      {
        path:"leaderboard",
        element: <Leaderboard />
      },
      {
        path:"admin",
        element: <AdminPage />
      },
      {
        path:'predictionResult',
        element: <PredictResult />
      }
      
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>
);

reportWebVitals();
