import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, responsiveFontSizes, createMuiTheme, ThemeProvider, IconButton } from '@material-ui/core';
import { RootState } from 'store';
import { useSelector, useDispatch } from 'react-redux';

import SidebarWidthPlaceholder from 'components/Sidebar/SidebarWidthPlaceholder';
import intl from 'react-intl-universal';

import TopNavHeightPlaceholder from 'components/TopNav/TopNavHeightPlaceholder';
import classNames from 'classnames';
import Scrollbar from 'components/common/Scrollbar';
import Spacer from 'components/common/Spacer';
import { cancelPageContentAction, savePageContentAction } from 'store/designer/actions';
import { openFixedBarAction } from 'store/fixedBar/actions';
import MdiIcon from 'components/common/MdiIcon';
import Toolbox from './Toolbox/Toolbox';
import { Schema } from './Core/Schemas/Schema';
import NodeView from './Core/Node/NodeView';
import pageContent from './pageContent'
import { parseSchemas } from './Core/Schemas/jsonParser';
import ActiveLabel from './Core/Utils/ActiveLabel';
import { CanvasNode } from './Core/Node/CanvasNode';
import FocusLabel from './Core/Utils/FocusLabel';
import NodeToolbar from './Core/Utils/NodeToolbar';
import MouseFollower from './Core/Utils/MouseFollower';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      display: 'flex',
      flexFlow: 'row',
      height:'100%',
    },
    leftArea:{
      display:'flex',
      flexFlow:'column',
      height:'100%',
      background: '#1a1a27',
      boxShadow: '0px 10px 13px -6px rgba(0,0,0,0.2), 0px 20px 31px 3px rgba(0,0,0,0.14), 0px 8px 38px 7px rgba(0,0,0,0.12)',
      zIndex:theme.zIndex.drawer + 1,
      color:"#f7f7f7",
    },
    leftTitle:{
      padding: theme.spacing(1,0,0,1),
      fontSize: '1.2rem',
    },
    rightArea:{
      flex:1,
      display:'flex',
      flexFlow:'column',
      justifyContent: 'stretch',
      height:'100%',
    },
    designButton:{
      boxShadow: theme.shadows[10],
    },

    designButtonIcon:{
      marginRight: theme.spacing(1),
    },
    pageContentArea:{
      flex:1,
      background: theme.palette.background.default,
      overflow: 'auto',
      display:'flex',
      flexFlow:'column',
    },

    toolboxIcon:{
      marginRight:theme.spacing(2),
    },

    toolbar:{
      background:"#3e3e54",
      boxShadow: theme.shadows[6],
    },
    cancelButton:{
      marginRight:theme.spacing(1),
    },
    scrollBar:{
      flex:1,
      display:'flex',
      flexFlow: 'column',
    },
  }),
);

const darkTheme = responsiveFontSizes(createMuiTheme({
  palette: {
    type: 'dark',
    primary:{
      main:"#5d78ff",
    },
    //secondary:{
      //main:"#ff9e43",
    //},    
  },
}));

export default function PageContentDesign() {
  const classes = useStyles();
  const selectMyStore = (state: RootState) => state.designer
  
  const [canvasSchema, setCanvasSchema] = React.useState(new Schema({name:'Canvas'}, parseSchemas(pageContent)));

  const myStore = useSelector(selectMyStore)  
  const dispatch = useDispatch()
  
  const handleCancel = () => {
    dispatch(cancelPageContentAction());
    dispatch(openFixedBarAction());
  };

  const handleSave = () => {
    dispatch(savePageContentAction());
    dispatch(openFixedBarAction());
  };


  return (
    <Backdrop className={classes.backdrop} open={myStore.pageContentDesign}>
      <ThemeProvider theme={darkTheme}>
        <SidebarWidthPlaceholder className={classes.leftArea}>
          <TopNavHeightPlaceholder className={classes.leftTitle}>
            
              <MdiIcon iconClass="mdi-tools" className={classes.toolboxIcon}></MdiIcon>
              {intl.get('component-box')}

          </TopNavHeightPlaceholder>
          <Scrollbar>
            <Toolbox></Toolbox>
          </Scrollbar>
        </SidebarWidthPlaceholder>
      </ThemeProvider>
      <div 
        className = {classes.rightArea}
      >
        <ThemeProvider theme={darkTheme}>
          <TopNavHeightPlaceholder className={classes.toolbar}>
            <IconButton>
              <MdiIcon iconClass="mdi-layers-outline"/>
            </IconButton>
            <IconButton>
              <MdiIcon iconClass="mdi-dock-bottom"/>
            </IconButton>
            <IconButton>
              <MdiIcon iconClass="mdi-border-none-variant"/>
            </IconButton>
            <IconButton>
              <MdiIcon iconClass="mdi-arrow-expand-horizontal"/>
            </IconButton>
            <IconButton>
              <MdiIcon iconClass="mdi-arrow-expand-vertical"/>
            </IconButton>
            <IconButton>
              <MdiIcon iconClass="mdi-eye-outline"/>
            </IconButton>
            <IconButton>
              <MdiIcon iconClass="mdi-undo"/>
            </IconButton>
            <IconButton>
              <MdiIcon iconClass="mdi-redo"/>
            </IconButton>
            <IconButton>
              <MdiIcon iconClass="mdi-delete-outline"/>
            </IconButton>
            <Spacer></Spacer>
            <Button onClick={handleCancel} className = {classes.cancelButton}>
              {intl.get('cancel')}
            </Button>
            <Button variant="contained" color="primary" onClick={handleSave}>
            {intl.get('save')}
            </Button>
          </TopNavHeightPlaceholder>
        </ThemeProvider>
        <div className={classNames(classes.pageContentArea) }>
          <Scrollbar permanent className={classes.scrollBar}>
            <NodeView schema={canvasSchema} contextName={CanvasNode} />
          </Scrollbar>
        </div>
      </div>
      <ActiveLabel />
      <FocusLabel />
      <NodeToolbar />
      <MouseFollower />
    </Backdrop>
  );
}