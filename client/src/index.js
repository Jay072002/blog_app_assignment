import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppStateProvider } from './AppContext';
import { Toaster } from "react-hot-toast";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
    <AppStateProvider>
      <App />
    </AppStateProvider>
  </React.StrictMode>
);

