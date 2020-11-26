import React from 'react';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Loading from 'admin/common/Loading'

import Layout from 'admin/Layout';
import ModuleManager from 'designer/ModuleManager';
import useThemeSettings from 'store/theme/useThemeSettings';
import useShadows from 'store/theme/useShadows';
import DrawerEditor from 'designer/DrawerEditor';
import SuccessAlertBar from 'base/Widgets/SuccessAlertBar';
import Login from 'admin/views/Login';
import { useIntl } from 'base/Hooks/useIntl';
import { LOGIN_URL } from 'utils/consts';

function App() {
  const [langLoading] = useIntl();
  const themeSettings = useThemeSettings();
  
  const theme = responsiveFontSizes(createMuiTheme({
    palette: {
      type: themeSettings.themeMode as any,
      primary:{
        main: themeSettings.primary,
      },

    },

    shadows:[...useShadows()] as any
  }));


  return (
    langLoading?
      (<Loading />)
    :
      (<ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch> 
            <Route path={ LOGIN_URL } component={Login}></Route>
            <Route path="/admin" component={Layout}></Route>
            <Route path="/design" component={ModuleManager}></Route>
            <Route path="/drawer-edit" component={DrawerEditor}></Route>
            <Redirect to={ LOGIN_URL } from='/' /> 
          </Switch>
        </BrowserRouter>
        <SuccessAlertBar />
      </ThemeProvider>)
  );
}

export default App;
