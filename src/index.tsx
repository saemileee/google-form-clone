import React from 'react';
import ReactDOM from 'react-dom/client';
import './reset.css';
import {Router} from './Router';
import {RouterProvider} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={Router} />
    </Provider>
  </React.StrictMode>
);
