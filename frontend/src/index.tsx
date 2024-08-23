import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'sonner';

// 
import "./index.css";
import App from './App';
// import GlobalContextProvider from './component/context/global-context';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster position="top-right" />
      <App />
    </Provider>
  </React.StrictMode>
);
