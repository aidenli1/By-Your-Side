import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import * as ReactDOMClient from "react-dom/client";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducer';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider
    store={createStoreWithMiddleware(Reducer,
      window.__REDUX_DEVTOOLS_EXTENTION__ &&
      window.__REDUX_DEVTOOLS_EXTENTION__()
    )}
  >
    <App />
  </Provider>
</React.StrictMode>

);
reportWebVitals();
