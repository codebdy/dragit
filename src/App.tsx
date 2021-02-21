import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loading from 'Common/Loading'
import {AppBoard} from 'AppBoard';
import useShadows from 'Utils/useShadows';
import {SuccessAlertBar} from 'Base/Widgets/SuccessAlertBar';
import { Login } from 'MainBoard/Login';
import { useIntl } from 'Base/Hooks/useIntl';
import {observer} from 'mobx-react';
import { ErrorDialog } from 'Base/Widgets/ErrorDialog';
import { useLoginCheck } from 'Store/Helpers/useLoginCheck';
import { LOGIN_URL } from 'Utils/consts';
import { ConfirmDialog } from 'Base/Widgets/ConfirmDialog';
import { AppStudio } from 'AppStudio';
import { MainBoard } from 'MainBoard';

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
          <Switch> 
            <Route path={ LOGIN_URL } component={Login}></Route>
            <Route path="/app/:appId/:pageId?/:id?" component={AppBoard}></Route>
            <Route path="/main-board" component={MainBoard}></Route>
            <Route path="/app-studio/:appId" component={AppStudio}></Route>
            <Redirect to={ LOGIN_URL } from='/' /> 
          </Switch>
        <SuccessAlertBar />
        <ErrorDialog />
        <ConfirmDialog />
      </ThemeProvider>)
  );
})

export default App;
