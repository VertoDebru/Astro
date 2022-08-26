import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Import components.
import App from './components/App';
// Import style.
import './index.css';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
  <BrowserRouter basename="/">
  <Routes>
    {/* Route by default */}
    <Route path="/" element={<App />} />
    {/* Unknown Route */}
    <Route path="*" element={
      <main>
        <section className='error'>
          <h2>ERROR 404</h2>
          <p>There's nothing here!</p>
          <a href="./">Go to Main page</a>
        </section>
      </main>
    } />
  </Routes>
  </BrowserRouter>
  </React.StrictMode>
);
