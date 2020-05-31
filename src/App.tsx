import React, { useEffect } from 'react';
import './App.css';
import Sidebar, {createSidebarTheme} from 'components/Sidebar/Sidebar'
import { CssBaseline } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
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

  const theme2 = responsiveFontSizes(createMuiTheme({
    palette: {
      type: 'light',
    },
  }));

  const selectIntl = (state: RootState) => state.intl

  const intLang = useSelector(selectIntl)

  return (
    intLang.loading?
      (<Loading />)
    :
      (<ThemeProvider theme={theme2}>
        <div className="App" style={{display:'flex', flexFlow:'row',width:'100vw', height:'100vh' }}>
          <CssBaseline />      
          <Sidebar 
            sidebarTheme={sidebarTheme1} 
            mobileOpen={mobileOpen} 
            //size={SidebarSize.large}
            onMobileClose={handleDrawerToggle}
          />
          <TopNav onSidebarToggle = {handleDrawerToggle}/>

          <div style={{display:'flex', flexFlow:'column',
            position:"relative",
            flex:"1",
          }}>
            

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

      </ThemeProvider>)

    
  );
}

export default App;
