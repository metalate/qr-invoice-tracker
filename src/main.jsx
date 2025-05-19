/* 
QRInvoice Tracker (Vite + React)
Versiyon: 1.0 - Prototip Sürüm 
*/

// 1. Proje Dosya Yapısı
// qr-invoice-tracker/ 
// ├── public/
// ├── src/ 
// │   └── App.jsx 
// │   └── main.jsx
// ├── package.json
// ├── .gitignore
// ├── README.md

// 2. .gitignore 
// node_modules/
// dist/
// .env

// 3. package.json (otomatik oluşur) 
// npm create vite@latest . -- --template react

// 4. src/main.jsx 
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
