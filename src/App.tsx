import React, { useEffect } from 'react';
import './App.css';
import Sidebar, {createSidebarTheme, SidebarSize} from 'components/Sidebar/Sidebar'
import { CssBaseline } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { useDispatch } from 'react-redux'
import FixedBar from 'components/FixedBar/FixedBar'

import image5 from "assets/img/sidebar-5.jpg";
import {thunkMenuItems} from "store/menu/actions"


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
    console.log('App Init')
    dispatch(thunkMenuItems())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const theme2 = responsiveFontSizes(createMuiTheme({
    palette: {
      type: 'light',
    },
  }));

  return (

      <ThemeProvider theme={theme2}>
        <div className="App" style={{display:'flex', flexFlow:'row',width:'100vw', height:'100vh' }}>
          <CssBaseline />      
          <Sidebar 
            sidebarTheme={sidebarTheme1} 
            mobileOpen={mobileOpen} 
            size={SidebarSize.large}
            onMobileClose={handleDrawerToggle}
          />
          

          <div style={{display:'flex', flexFlow:'row',
            position:"relative",//marginLeft: sidebarOccupiedWidth + 'px',
            flex:"1",
          }}>
            <AppBar position="absolute">
              <Toolbar>
              <Hidden mdUp>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              </Hidden>
                  Responsive drawer
              </Toolbar>
            </AppBar>
            <div style={{padding:'20px',display:'flex', flexFlow:'column',}}>
              <h2>侧边栏主题</h2>
              <Button> 主题1</Button>
              <Button> 主题2</Button>
              <Button> 主题3</Button>
              <Button> 主题4</Button>
              <Button> 主题5</Button>
            </div>
            <div style={{padding:'20px'}}>
              <h2>侧边栏背景</h2>
              <Button> 背景1</Button>
            </div>
            <div style={{padding:'20px'}}>
              <h2>侧边栏大小</h2>
              <Button> 大</Button>
            </div>
          </div>
          <FixedBar />
        </div>

      </ThemeProvider>

    
  );
}

export default App;
