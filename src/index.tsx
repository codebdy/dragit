import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './mock/client';

import { AppStoreProvider }from 'store/helpers/AppStoreProvider';
import {AppStore} from 'store/AppStore' 
import { CssBaseline } from '@material-ui/core';

import 'config';

const appStore = new AppStore();

ReactDOM.render(
  <AppStoreProvider value = {appStore}>
    <ApolloProvider client={client}>
      <CssBaseline />      
      <App />
    </ApolloProvider>
  </AppStoreProvider>  
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
