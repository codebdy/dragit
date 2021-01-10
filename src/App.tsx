import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Loading from 'AdminBoard/common/Loading'

import {AdminBoard} from 'AdminBoard';
import ModuleManager from 'design1/ModuleManager';
import useShadows from 'utils/useShadows';
import DrawerEditor from 'design1/DrawerEditor';
import {SuccessAlertBar} from 'base1/Widgets/SuccessAlertBar';
import Login from 'AdminBoard/views/Login';
import { useIntl } from 'base1/Hooks/useIntl';
import { LOGIN_URL } from 'utils/consts';
import { useThemeSettings } from 'store1/helpers1/useAppStore';
import {observer} from 'mobx-react-lite';
import { ErrorDialog } from 'base1/Widgets/ErrorDialog';
import { useLoginCheck } from 'store1/helpers1/useLoginCheck';

const App = observer(()=>{
  const [langLoading] = useIntl();
  const themeSettings = useThemeSettings();
  
  useLoginCheck();

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
            <Route path="/admin" component={AdminBoard}></Route>
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
