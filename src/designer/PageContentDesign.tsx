import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, responsiveFontSizes, createMuiTheme, ThemeProvider, IconButton } from '@material-ui/core';
import { RootState } from 'store';
import { useSelector, useDispatch } from 'react-redux';

import intl from 'react-intl-universal';

import TopNavHeightPlaceholder from 'admin/TopNav/TopNavHeightPlaceholder';
import classNames from 'classnames';
import Scrollbar from 'admin/common/Scrollbar';
import Spacer from 'components/common/Spacer';
import { cancelPageContentAction, savePageContentAction } from 'store/designer/actions';
import { openFixedBarAction } from 'store/fixedBar/actions';
import MdiIcon from 'components/common/MdiIcon';
//import { Schema } from './Core/Schemas/Schema';
import NodeView from './Core/Node/NodeView';
import ActiveLabel from './Core/Utils/ActiveLabel';
import { CanvasNode } from './Core/Node/CanvasNode';
import NodeToolbar from './Core/Utils/NodeToolbar';
import MouseFollower from './Core/Utils/MouseFollower';
import bus, { CANVAS_SCROLL } from './Core/bus';
import { parseNodes } from './Core/Node/jsonParser';
import LeftArea from './LeftArea';
import FocusLabel from './Core/Utils/FocusLabel';

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
      padding: theme.spacing(0),
      //fontSize: '1.1rem',
      //borderBottom:"rgba(0,0,0, .4) solid 2px",
      display:'flex',
      flexFlow:'row',
      alignItems:"flex-end",
      height:'63px',
      background: 'rgba(0,0,0,0.3)',
      boxShadow: theme.shadows[6],
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
  const myStore = useSelector(selectMyStore)
  //相当于复制一个Json副本，不保存的话直接扔掉
  let nodes = parseNodes(myStore.pageJson?.layout);
  let canvas = new CanvasNode(nodes);
  //复制一份出来，不保存的话直接扔掉
  let fields = myStore.pageJson
    ?
    JSON.parse(JSON.stringify(myStore.pageJson?.fields))
    :
    []

 
  const dispatch = useDispatch()
  
  const handleCancel = () => {
    dispatch(cancelPageContentAction());
    dispatch(openFixedBarAction());
  };

  const handleSave = () => {
    dispatch(savePageContentAction());
    dispatch(openFixedBarAction());
  };

  const handleScroll = ()=>{
    bus.emit(CANVAS_SCROLL)
  }

  return (
    <Backdrop className={classes.backdrop} open={myStore.pageContentDesign}>
      <ThemeProvider theme={darkTheme}>
        <LeftArea fields={fields}/>
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
          <Scrollbar permanent className={classes.scrollBar} onScroll ={handleScroll}>
            {myStore.pageContentDesign &&
              <NodeView node={canvas} />
            }
          </Scrollbar>
        </div>
      </div>
      <FocusLabel />
      <NodeToolbar />
      <ActiveLabel />
      <MouseFollower />
    </Backdrop>
  );
}