import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './mock'
import { Provider } from 'react-redux'
import configureStore from "./store";
import {register, registerHtmlTag} from "./base/DragRX";
import { Button, Divider, Typography } from '@material-ui/core';
import PortletGridItem from 'components/Portlet/GridItem';
import ListView from 'components/ListView';
import MediaSelect from 'components/MediaSelect/MediaSelect';
import OneToManyTable from 'components/OneToManyTable';
import Portlet from 'components/Portlet';
import PortletFooter from 'components/Portlet/Footer';
import PortletGridContainer from 'components/Portlet/GridContainer';
import Combobox from 'components/Select/Combobox';
import SelectBox from 'components/Select/SelectBox';
import Canvas from 'designer/PageEditor/Core/Canvas';
import MediasPortlet from 'components/MediasPortlet';
import { HeadRule } from 'components/Head/Rule';
import { ButtonRule } from 'components/Button/Rule';
import { DividerRule } from 'components/Divider/Rule';
import { CanvasRule } from 'components/Canvas/Rule';
import GridRow from 'components/Grid/Row';
import GridColumn from 'components/Grid/Column';
import { TypographyRule } from 'components/Typography/Rule';
import { PortletGridItemRule } from 'components/Portlet/GridItem/Rule';
import TextBox from 'components/TextBox';
import { TextBoxRule } from 'components/TextBox/Rule';
import { MediasPortletRule } from 'components/MediasPortlet/Rule';
import { SelectRule } from 'components/Select/Rule';
import { OneToManyTableRule } from 'components/OneToManyTable/Rule';
import { PortletRule } from 'components/Portlet/Rule';
import { ListViewRule } from 'components/ListView/Rule';
import { GridColumnRule } from 'components/Grid/Column/Rule';
import { GridRowRule } from 'components/Grid/Row/Rule';
import OneToManyPortlet from 'components/OneToManyPortlet';
import { OneToManyPortletRule } from 'components/OneToManyPortlet/Rule';
import MultiSelectBox from 'components/Select/MultiSelectBox';
import SwitchBox from 'components/SwitchBox';
import { SwitchBoxRule } from 'components/SwitchBox/Rule';
import OneToOnePortlet from 'components/OneToOnePortlet';
import { OneToOnePortletRule } from 'components/OneToOnePortlet/Rule';
import FieldView from 'components/FieldView';
import { FieldViewRule } from 'components/FieldView/Rule';
import TinyMCE from 'components/TinyMCE';
import {TinyMCERule} from 'components/TinyMCE/Rule';
import TreeEditor from 'components/Tree/TreeEditor';
import { TreeEditorRule } from 'components/Tree/TreeEditor/Rule';
import TreeSelect from 'components/Tree/TreeSelect';
import { TreeSelectRule } from 'components/Tree/TreeSelect/Rule';
import Medias from 'components/Medias';

const store = configureStore();

register('Canvas', Canvas, CanvasRule);
register('Divider', Divider, DividerRule);
register('GridRow', GridRow, GridRowRule);
register('GridColumn', GridColumn, GridColumnRule);
register('Button',Button, ButtonRule);
register('TextBox', TextBox, TextBoxRule);
register('SwitchBox', SwitchBox, SwitchBoxRule);
register('FieldView', FieldView, FieldViewRule);
register('Portlet', Portlet, PortletRule);
register('PortletGridContainer', PortletGridContainer);
register('PortletGridItem', PortletGridItem, PortletGridItemRule);
register('PortletFooter', PortletFooter);
register('Typography', Typography, TypographyRule);
register('ListView', ListView, ListViewRule);
register('MediasPortlet', MediasPortlet, MediasPortletRule);
register('SelectBox', SelectBox, SelectRule);
register('Combobox', Combobox, SelectRule);
register('MultiSelectBox', MultiSelectBox, SelectRule)
register('OneToManyTable', OneToManyTable, OneToManyTableRule);
register('OneToOnePortlet', OneToOnePortlet, OneToOnePortletRule);
register('OneToManyPortlet', OneToManyPortlet, OneToManyPortletRule);
register('TinyMCE', TinyMCE, TinyMCERule);
register('TreeEditor', TreeEditor, TreeEditorRule);
register('TreeSelect', TreeSelect, TreeSelectRule);
register('MediaSelect', MediaSelect);
register('Medias', Medias);
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
