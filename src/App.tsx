import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Loading from 'Common/Loading'

import {AppBoard} from 'AppBoard';
import useShadows from 'Utils/useShadows';
import {SuccessAlertBar} from 'Base/Widgets/SuccessAlertBar';
import Login from 'AppManager/Login';
import { useIntl } from 'Base/Hooks/useIntl';
import {observer} from 'mobx-react';
import { ErrorDialog } from 'Base/Widgets/ErrorDialog';
import { useLoginCheck } from 'Store/Helpers/useLoginCheck';
import { LOGIN_URL } from 'Utils/consts';
import { ConfirmDialog } from 'Base/Widgets/ConfirmDialog';
import { AppManager } from 'AppManager';
import { AppStudio } from 'AppStudio';

const App = observer(()=>{
  const [langLoading] = useIntl();
  
  useLoginCheck();

  const theme = createMuiTheme({
    palette: {
      type: 'light',
      primary:{
        main: '#5d78ff',
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
            <Route path="/app/:appId/" component={AppBoard}></Route>
            <Route path="/apps-index" component={AppManager}></Route>
            <Route path="/app-studio/:id" component={AppStudio}></Route>
            <Redirect to={ LOGIN_URL } from='/' /> 
          </Switch>
        </BrowserRouter>
        <SuccessAlertBar />
        <ErrorDialog />
        <ConfirmDialog />
      </ThemeProvider>)
  );
})

export default App;
