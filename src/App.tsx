import React from 'react';
import './App.css';
import Sidebar, {createSidebarTheme} from 'components/Sidebar/Sidebar'
import { CssBaseline } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import image5 from "assets/img/sidebar-5.jpg";

const sidebarTheme1 = createSidebarTheme({
  backgroundImage: image5,
  maskLinearGradient: 'linear-gradient(45deg,#780206,#061161)',
})

function App() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [sidebarOccupiedWidth, setSidebarOccupiedWidth] = React.useState(0);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOccupiedWidthChange = (width:number)=>{
    //console.log(width)
    setSidebarOccupiedWidth(width)
  }

  const theme2 = createMuiTheme({
    palette: {
        type: 'light',
  
    },
  });

  return (
    <ThemeProvider theme={theme2}>
      <div className="App" style={{display:'flex', flexFlow:'row',width:'100vw', height:'100vh' }}>
        <CssBaseline />      
        <Sidebar 
          sidebarTheme={sidebarTheme1} 
          mobileOpen={mobileOpen} 
          onMobileClose={handleDrawerToggle}
          onOccupiedWidthChange={handleOccupiedWidthChange} 
        >Sidebar</Sidebar>

        <div style={{justifyContent:'center', display:'flex', flexFlow:'row',
          position:"relative",//marginLeft: sidebarOccupiedWidth + 'px',
          flex:"1",
        }}>
          <AppBar position="absolute">
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
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
        
      </div>

    </ThemeProvider>
  );
}

export default App;
