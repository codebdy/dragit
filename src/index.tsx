import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import * as serviceWorker from './serviceWorker';
import { CssBaseline } from '@material-ui/core';
import 'config';
import { DragItStore } from 'Store/DragItStore';
import { DragItStoreProvider } from 'Store/Helpers/DragItStoreProvider';
import { BrowserRouter } from 'react-router-dom';

const appStore = new DragItStore();

ReactDOM.render(
  <DragItStoreProvider value = {appStore}>
    <CssBaseline />      
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </DragItStoreProvider>  
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
