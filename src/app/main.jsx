import React, { lazy, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '../shared/config/styles/global.css';
import '../shared/config/styles/adaptive.css';
import '../shared/config/styles/inputStyles.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './providers/store/AppContext.jsx';
import { AuthProvider } from './providers/store/AuthContext.jsx';

// eslint-disable-next-line react-refresh/only-export-components
const ServiceWorkerRegister = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('../../sw.js')
        .then((registration) => {
          console.log('Service Worker зарегистрирован:', registration);
        })
        .catch((error) => {
          console.error('Ошибка регистрации Service Worker:', error);
        });
    }
  }, []);

  return null;
};

// eslint-disable-next-line react-refresh/only-export-components
const ErrorBoundary = lazy(() => import('./init/ErrorBoundary.jsx'))

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AppProvider>
      <AuthProvider>
        <BrowserRouter basename='/R-M-pwa-app'>
          <ErrorBoundary>
            <ServiceWorkerRegister />
            <App />
          </ErrorBoundary>
        </BrowserRouter>
      </AuthProvider>  
    </AppProvider>
  </React.StrictMode>
);
