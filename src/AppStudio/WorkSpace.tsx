import * as React from 'react';
import { observer } from 'mobx-react';
import { useAppStudioStore } from './AppStudioStore';
import { RxPageEditor } from './Pages/RxPageEditor';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import NavigationEditor from './Navigation/NavigationEditor';

export const WorkSpace = observer(() => {
  const studioStore = useAppStudioStore();
  const theme = createMuiTheme({
    palette: {
      type:studioStore?.themeMode,
      primary:{
        main:'#5a8dee',
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      {
        studioStore?.editingPage &&
        <RxPageEditor rxPage = {studioStore?.editingPage}/>
      }
      {
        studioStore?.editingNavigation && 
        <NavigationEditor />
      }
    </ThemeProvider>
  );
})
