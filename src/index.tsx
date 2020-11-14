import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './mock'
import { Provider } from 'react-redux'
import configureStore from "./store";
import {register} from "./DragIt";
import { Button, Card, CardActions, CardContent, CardHeader, Container, Divider, Grid, Paper, TextField, Typography } from '@material-ui/core';
import FormField from 'components/FormField';
import FormGridItem from 'components/FormGridItem/FormGridItem';
import ListView from 'components/ListView/ListView';
import MediaSelect from 'components/MediaSelect/MediaSelect';
import OneToManyTable from 'components/OneToManyTable/OneToManyTable';
import Portlet from 'components/Portlet/Portlet';
import PortletFooter from 'components/Portlet/PortletFooter';
import PortletFormGridBody from 'components/Portlet/PortletFormGridBody';
import Combobox from 'components/Select/Combobox';
import SelectBox from 'components/Select/SelectBox';
import Canvas from 'designer/Core/Canvas';
import MediasPortlet from 'components/MediasPortlet/MediasPortlet';

const store = configureStore();

register('Container', Container);
register('Canvas', Canvas);
register('Divider', Divider);
register('Grid', Grid);
register('Button',Button);
register('Card', Card);
register('CardHeader', CardHeader);
register('CardContent', CardContent);
register('CardActions', CardActions);
register('Paper', Paper);
register('TextField', TextField);
register('FormField', FormField);
register('Portlet', Portlet);
register('PortletFormGridBody', PortletFormGridBody);
register('FormGridItem', FormGridItem);
register('PortletFooter', PortletFooter);
register('Typography', Typography);
register('ListView', ListView);
register('MediasPortlet', MediasPortlet);
register('SelectBox', SelectBox);
register('Combobox', Combobox);
register('OneToManyTable', OneToManyTable);
register('MediaSelect', MediaSelect);

ReactDOM.render(
  <Provider store={store}>  
    <App />
  </Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
