import React, { useEffect } from 'react';
import './App.css';
import Sidebar, {createSidebarTheme} from 'components/Sidebar/Sidebar'
import { CssBaseline } from '@material-ui/core';
import { createMuiTheme, responsiveFontSizes, Theme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux'
import FixedBar from 'components/FixedBar/FixedBar'
import Loading from 'components/common/Loading'

import image5 from 'assets/img/sidebar-5.jpg';
import {thunkMenuItems} from 'store/menu/thunks';
import {thunkIntl} from 'store/intl/thunks';
import { RootState } from 'store';

import TopNav from 'components/TopNav/TopNav';


const sidebarTheme1 = createSidebarTheme({
  backgroundImage: image5,
  maskLinearGradient: 'linear-gradient(45deg,#780206,#061161)',
})

function App() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
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
        <div style={{background:'#f2f4f4' }}>
          <CssBaseline />      
          <Sidebar 
            sidebarTheme={sidebarTheme1} 
            mobileOpen={mobileOpen} 
            //size={SidebarSize.large}
            onMobileClose={handleDrawerToggle}
          />
          <TopNav onSidebarToggle = {handleDrawerToggle}/>

          <div style={{ height:'1000px' }}>
          </div>

          <FixedBar />
        </div>

      </ThemeProvider>)
  );
}

export default App;
