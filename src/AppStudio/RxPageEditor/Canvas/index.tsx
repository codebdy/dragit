import React from 'react';
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import {observer} from 'mobx-react';
import { useAppStudioStore } from 'AppStudio/AppStudioStore';
import CanvasInner from './CanvasInner';


const Canvas = observer((props: {className?:string, children?:any, style?:any}) => {
  const {children, ...rest} = props;
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
    <ThemeProvider theme = {theme}>
      <CanvasInner {...rest}>
        {children}
      </CanvasInner>
    </ThemeProvider>
  )
});

export default Canvas