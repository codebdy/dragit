import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Loading from 'admin/common/Loading'

import {Layout} from 'admin/Layout';
import ModuleManager from 'designer/ModuleManager';
import useShadows from 'utils/useShadows';
import DrawerEditor from 'designer/DrawerEditor';
import {SuccessAlertBar} from 'base/Widgets/SuccessAlertBar';
import Login from 'admin/views/Login';
import { useIntl } from 'base/Hooks/useIntl';
import { LOGIN_URL } from 'utils/consts';
import { useThemeSettings } from 'store/helpers/useAppStore';
import {observer} from 'mobx-react-lite';
import { ErrorDialog } from 'base/Widgets/ErrorDialog';

const App = observer(()=>{
  const [langLoading] = useIntl();
  const themeSettings = useThemeSettings();
  
  const theme = createMuiTheme({
    palette: {
      type: themeSettings.themeMode as any,
      primary:{
        main: themeSettings.primary,
      },

    },

    shadows:[...useShadows()] as any
  });


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
        <ErrorDialog />
      </ThemeProvider>)
  );
})

export default App;
