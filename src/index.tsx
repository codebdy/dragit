import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './mock'
import { Provider } from 'react-redux'
import configureStore from "./store";
import {register, registerHtmlTag} from "./DragIt";
import { Button, Divider, TextField, Typography } from '@material-ui/core';
import FormField from 'components/FormField';
import FormGridItem from 'components/Grid/FormGridItem';
import ListView from 'components/ListView';
import MediaSelect from 'components/MediaSelect/MediaSelect';
import OneToManyTable from 'components/OneToManyTable';
import Portlet from 'components/Portlet';
import PortletFooter from 'components/Portlet/PortletFooter';
import PortletFormGridBody from 'components/Portlet/PortletFormGridBody';
import Combobox from 'components/Select/Combobox';
import SelectBox from 'components/Select/SelectBox';
import Canvas from 'designer/Core/Canvas';
import MediasPortlet from 'components/MediasPortlet/MediasPortlet';
import { HeadRule } from 'components/Head/Rule';
import { ButtonRule } from 'components/Button/Rule';
import { DividerRule } from 'components/Divider/Rule';
import { CanvasRule } from 'components/Canvas/Rule';
import GridRow from 'components/Grid/Row';
import GridColumn from 'components/Grid/Column';

const store = configureStore();

register('Canvas', Canvas, CanvasRule);
register('Divider', Divider, DividerRule);
register('GridRow', GridRow);
register('GridColumn', GridColumn);
register('Button',Button, ButtonRule);
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
registerHtmlTag('h1', HeadRule);
registerHtmlTag('h2', HeadRule);
registerHtmlTag('h3', HeadRule);
registerHtmlTag('h4', HeadRule);
registerHtmlTag('h5', HeadRule);
registerHtmlTag('h6', HeadRule);

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
