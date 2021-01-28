import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import { Avatar, createMuiTheme, IconButton, Paper, ThemeProvider, Tooltip } from '@material-ui/core';
import MdiIcon from 'Components/Common/MdiIcon';
import Spacer from 'Components/Common/Spacer';
import { Fragment } from 'react';
import { DARK } from 'Store/ThemeSettings';
import intl from 'react-intl-universal';
import { useAppStudioStore } from './AppStudioStore';
import { PopuDrawer } from './PopuDrawer';
import { Pages } from './Pages';
import { AddNewPage } from './Pages/AddNewPage';
import { Auths } from './Auths';
import { Settings } from './Settings';
import classNames from 'classnames';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      position:'fixed',
      left:'0',
      top:'0',
      height:'100%',
      background:'#1a233a',
      color:'#8494a7',
      zIndex:theme.zIndex.modal + 1,
      display:'flex',
      flexFlow:'column',
      alignItems:'center',
      paddingBottom: theme.spacing(2),
    },

    outlined:{
      outline:theme.palette.divider + ' solid 1px',
    },
    
    logoIcon: {
      backgroundColor: theme.palette.primary.main,
      letterSpacing:'1px',
      fontWeight:'bold',
      fontSize:'20px',
      marginTop:theme.spacing(1),
      color:"#FFF",
    },
    buttons:{
      marginTop:theme.spacing(2),
      display:'flex',
      flexFlow:'column',
      alignItems:'center',
    },
  }),
);


export const VerticalBar = observer(() => {
  const classes = useStyles();
  const [pagesOpen, setPagesOpen] = React.useState(false);
  const [authsOpen, setAuthsOpen] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const studioStore = useAppStudioStore();
  const iconColor = "#8494a7";
  const theme = createMuiTheme({
    palette: {
      type: DARK,
      primary:{
        main:'#5a8dee',
      },
      background:{
        default:'#1a233a',
        paper:'#272e48',
      }
    },
  });

  const activeIconColor = "#5a8dee";

  const handleBarClick = ()=>{
    setPagesOpen(false);
    setSettingsOpen(false);
    setAuthsOpen(false);
  }

  const handlePagesClick = (event:React.MouseEvent<HTMLElement>)=>{
    event.stopPropagation();
    setPagesOpen(!pagesOpen)
    setSettingsOpen(false);
    setAuthsOpen(false);
  }

  const handleNavigationClick = (event:React.MouseEvent<HTMLElement>)=>{
    event.stopPropagation();
    setSettingsOpen(false);
    setPagesOpen(false)
    setAuthsOpen(false);
    studioStore?.editNavigation();
  }

  const handleClosePages = ()=>{
    setPagesOpen(false);
  }
  const handleAuthsClick = (event:React.MouseEvent<HTMLElement>)=>{
    event.stopPropagation();
    setSettingsOpen(false);
    setPagesOpen(false)
    setAuthsOpen(!authsOpen);
  }

  const handleCloseAuths = ()=>{
    setAuthsOpen(false);
  }

  const handleSettingsClick = (event:React.MouseEvent<HTMLElement>)=>{
    event.stopPropagation();
    setSettingsOpen(!settingsOpen);
    setPagesOpen(false)
    setAuthsOpen(false);
  }

  const handleCloseSettings = ()=>{
    setSettingsOpen(false);
  }

  const popDrawerOpen = pagesOpen||authsOpen||authsOpen||settingsOpen

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Paper 
          className = {classNames(classes.root, popDrawerOpen ? classes.outlined : '')} 
          square
          elevation = { popDrawerOpen ? 0 : 6}
          style={{width:studioStore?.verticalBarWidth}}
          onClick = {handleBarClick}
        >
          <Avatar
            className = {classes.logoIcon}
            variant="rounded"
          >
            RX
          </Avatar>
          <div className = {classes.buttons}>
            <Tooltip title={intl.get('pages')} placement="right">
              <IconButton
                onClick = {handlePagesClick}
              >
                <MdiIcon iconClass = "mdi-file-outline" color={studioStore?.editingPage ? activeIconColor : iconColor}/>
              </IconButton>
            </Tooltip>
            <Tooltip title={intl.get('navigation')} placement="right">
              <IconButton
                onClick = {handleNavigationClick}
              >
                <MdiIcon iconClass = "mdi-file-tree-outline" color={studioStore?.editingNavigation ? activeIconColor : iconColor} />
              </IconButton>
            </Tooltip>
            <Tooltip title={intl.get('authority')} placement="right">
              <IconButton
                onClick = {handleAuthsClick}
              >
                <MdiIcon iconClass = "mdi-script-text-key-outline" color={iconColor}/>
              </IconButton>
            </Tooltip>
          </div>
          <Spacer />
          <Tooltip title={intl.get('settings')} placement="right">
            <IconButton
              onClick = {handleSettingsClick}
            >
              <MdiIcon iconClass = "mdi-cog-outline" color={iconColor}/>
            </IconButton>
          </Tooltip>
        </Paper>
      </ThemeProvider>
      <PopuDrawer
        open={pagesOpen}
        onClose={handleClosePages}
        title = {intl.get('pages')}
        titleAction = {
          <AddNewPage />
        }
      >       
        <Pages onClose={()=>setPagesOpen(false)}/>
      </PopuDrawer>

      <PopuDrawer
        open={authsOpen}
        onClose={handleCloseAuths}
        title = {intl.get('authority')}
      >
        <Auths/>
      </PopuDrawer>

      <PopuDrawer
        open={settingsOpen}
        onClose={handleCloseSettings}
        title = {intl.get('settings')}
      >
        <Settings onClose = {handleCloseSettings}/>
      </PopuDrawer>
    </Fragment>
  );
})
