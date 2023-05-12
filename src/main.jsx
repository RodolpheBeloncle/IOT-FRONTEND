import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserContextProvider from './context/UserContextProvider';

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <BrowserRouter>
//     <UserContextProvider>
//       <App />
//     </UserContextProvider>
//   </BrowserRouter>
// );


ReactDOM.render(

    <App/>,

  document.getElementById('root')
);