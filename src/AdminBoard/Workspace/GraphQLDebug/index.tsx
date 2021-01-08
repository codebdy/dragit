import React, { useState } from 'react';
import { makeStyles, Theme, createStyles, Fab, Hidden, Drawer, Divider, IconButton, Typography, createMuiTheme, responsiveFontSizes, ThemeProvider} from '@material-ui/core';
import MdiIcon from 'components/common/MdiIcon';
import { useLeftDrawer, useThemeSettings } from 'store/helpers/useAppStore';
import { Close } from '@material-ui/icons';
import { usePageGQLStore } from 'base/GraphQL/PageGQLProvider';
import { GraphQLDebugPannel } from './GraphQLDebugPannel';
import intl from 'react-intl-universal';
import { DARK } from 'store/ThemeSettings';
import "./style.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(1),
    },
    title: {
      margin: 0,
      display:'flex',
      alignItems:'center',
      padding:theme.spacing(1.5, 2),
    },
    titleText:{
      marginLeft:theme.spacing(1),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(0.2),
      top: theme.spacing(0.5),
      color: theme.palette.grey[500],
    },
    content:{
      height:'100%',
      display:'flex',
      flexFlow:'row',
    },
    tabs: {
      marginLeft:theme.spacing(2),
    },

    tabPanel:{
      flex:1,
      display:'flex',
    }
  }),
);

export default function GraphQLDebug(){
  const classes = useStyles();
  const leftDrawer = useLeftDrawer();
  const [open, setOpen] = useState(false);
  const fabLeft = leftDrawer.isMini ? leftDrawer.compactWidth : leftDrawer.fullWidth;
  const handleClose = ()=>{
    setOpen(false)
  }
  const themeSettings = useThemeSettings();
  const theme = responsiveFontSizes(createMuiTheme({
    palette: {
      type: DARK,
      primary:{
        main:themeSettings.primary,
      },
      background:{
        paper:'#212121',
      }
    },
    
  }));

  const pageGqlStore = usePageGQLStore();

  return (
    <ThemeProvider theme={theme}>
      <Hidden smDown>
        {
          !open &&
          <Fab 
            className={classes.fab} 
            size="small" 
            aria-label="GraphQL Debug" 
            style={{left:(fabLeft + 8) + 'px'}}
            onClick={()=>setOpen(true)} 
          >        
            <MdiIcon iconClass="mdi-graphql"  color={'#e10098'} />
          </Fab>
        }

        <Drawer anchor="bottom" variant="persistent" open={open} onClose={handleClose}>
          <div className = {classes.title}>
            <MdiIcon iconClass="mdi-graphql" />        
            <Typography className={classes.titleText} variant="h6">GraphQL {intl.get('debug')}</Typography>
            <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
              <Close />
            </IconButton>
          </div>
          <Divider />
          <div className={classes.content}> 
          <GraphQLDebugPannel queries = {pageGqlStore?.queries} />
          </div>
        </Drawer>
      </Hidden>
    </ThemeProvider>     
  )
}
