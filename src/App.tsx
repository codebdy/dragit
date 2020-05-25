import React from 'react';
import './App.css';
import Sidebar from 'components/Sidebar/Sidebar'
import { CssBaseline } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

function App() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className="App">
      <CssBaseline />      
      <Sidebar mobileOpen={mobileOpen} onMobileClose={handleDrawerToggle} >Sidebar</Sidebar>

      <AppBar position="fixed">
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
      </AppBar>      learn react
    </div>
  );
}

export default App;
