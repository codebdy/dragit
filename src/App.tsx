import React, { useEffect } from 'react';
//import './App.css';
import { createMuiTheme, responsiveFontSizes, Theme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Loading from 'admin/common/Loading'
import {thunkMenuItems} from 'store/menu/thunks';
import {thunkIntl} from 'store/intl/thunks';
import { RootState } from 'store';

import Layout from 'admin/Layout';
import ModuleManager from 'designer/ModuleManager';


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('App Init');
    dispatch(thunkIntl());
    dispatch(thunkMenuItems());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const generateShadows = (theme: Theme) => {
    return theme.shadows.reduce(function(result, item, index, array) {
      result[index] = weakenShadow(item) ;
      return result;
    }, new Array<string>());
  };

  const weakenShadow = (shadow:string)=>{
    return shadow.replace('rgba(0,0,0,0.14)','rgba(0,0,0,0.042)')
      .replace('rgba(0,0,0,0.02)','rgba(0,0,0,0.006)')
      .replace('rgba(0,0,0,0.12)','rgba(0,0,0,0.036)');
  }

  const oldTheme = createMuiTheme({})

  const theme = responsiveFontSizes(createMuiTheme({
    palette: {
      type: 'light',
      background:{
        default:'#f4f5fa',
      },
      primary:{
        main:"#5d78ff",
      },
      //secondary:{
        //main:"#ff9e43",
      //},    
    },

    shadows:[...generateShadows(oldTheme)] as any
  }));

  generateShadows(oldTheme)

  const selectIntl = (state: RootState) => state.intl

  const intLang = useSelector(selectIntl)

  return (
    intLang.loading?
      (<Loading />)
    :
      (<ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch> 
            <Route path="/admin" component={Layout}></Route>
            <Route path="/design" component={ModuleManager}></Route>
            <Redirect to="/admin" from='/' /> 
          </Switch>
        </BrowserRouter>
      </ThemeProvider>)
  );
}

export default App;
