import React from 'react';
import { makeStyles, Theme, createStyles, Hidden, Drawer, Divider, IconButton, Typography, createMuiTheme, responsiveFontSizes, ThemeProvider} from '@material-ui/core';
import MdiIcon from 'Components/Common/MdiIcon';
import { Close } from '@material-ui/icons';
import { usePageGQLStore } from 'Base/GraphQL/PageGQLProvider';
import { GraphQLDebugPannel } from './GraphQLDebugPannel';
import intl from 'react-intl-universal';
import "./style.css";
import { useThemeSettings } from 'Store/Helpers/useAppStore';
import { DARK } from 'Store/ThemeSettings';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

export default function GraphQLDebug(
  props:{
    open?:boolean,
    onClose?:()=>void,
  }
){
  const {open, onClose} = props;
  const classes = useStyles();
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
        <Drawer anchor="bottom" variant="persistent" open={open} onClose={onClose}>
          <div className = {classes.title}>
            <MdiIcon iconClass="mdi-graphql" />        
            <Typography className={classes.titleText} variant="h6">GraphQL {intl.get('debug')}</Typography>
            <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
              <Close />
            </IconButton>
          </div>
          <Divider />
          <div className={classes.content}> 
            <GraphQLDebugPannel gqls = {pageGqlStore?.gqls} />
          </div>
        </Drawer>
      </Hidden>
    </ThemeProvider>     
  )
}
