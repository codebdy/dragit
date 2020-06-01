import React from 'react';
import { CssBaseline, makeStyles, Theme, createStyles } from '@material-ui/core';
import Sidebar, { createSidebarTheme } from 'components/Sidebar/Sidebar';
import image5 from 'assets/img/sidebar-5.jpg';
import SidebarWidthPlaceholder from 'components/Sidebar/SidebarWidthPlaceholder';
import TopNav from 'components/TopNav/TopNav';
import FixedBar from 'components/FixedBar/FixedBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background:'#f2f4f4',
      minHeight:'100%',
    },

  }),
);

const sidebarTheme1 = createSidebarTheme({
  backgroundImage: image5,
  maskLinearGradient: 'linear-gradient(45deg,#780206,#061161)',
})

export default function Layout(){
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />      
      <Sidebar 
        sidebarTheme={sidebarTheme1} 
        mobileOpen={mobileOpen} 
        //size={SidebarSize.large}
        onMobileClose={handleDrawerToggle}
      />
      <TopNav onSidebarToggle = {handleDrawerToggle}/>

      <div style={{ flex:'1', display:'flex', flexFlow:'row'}}>
        <SidebarWidthPlaceholder />
        <div style={{flex:'1'}}>
        content<br/><br/>
        content2<br/><br/>
        content3<br/><br/>
        content4<br/><br/>
        content5<br/><br/>
        content6<br/><br/>
        content7<br/><br/>
        </div>
      </div>

      <FixedBar />
    </div>
  )
}