import React, { useEffect, useState } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, responsiveFontSizes, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { RootState } from 'store';
import { useSelector, useDispatch } from 'react-redux';

import intl from 'react-intl-universal';

import TopNavHeightPlaceholder from 'admin/TopNav/TopNavHeightPlaceholder';
import classNames from 'classnames';
import Scrollbar from 'admin/common/Scrollbar';
import Spacer from 'components/common/Spacer';
import { cancelPageContentAction, savePageContentAction, showOutlineActon, showPaddingXActon, showPaddingYActon } from 'store/designer/actions';
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

    toolbarButton:{
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      width:'40px',
      height:'40px',
      borderRadius:'3px',
      margin:'1px',
      "&:hover":{
        background:"rgba(255,255,255, 0.1)",
      },
      cursor:"pointer",
    },
    checkedButton:{
      background:"rgba(255,255,255, 0.15)",
      "&:hover":{
        background:"rgba(255,255,255, 0.2)",
      },
    }
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

export function ToolbarIcon(props:{checked?:boolean, onClick?:()=>void, children?:any}){
  const{checked, onClick, children} = props;
  const classes = useStyles();

  return (
    <div className={ classNames(classes.toolbarButton, {[classes.checkedButton]:checked}) }
      onClick = {onClick}
    >
      {children}
    </div>
  )
}

export default function PageContentDesign() {
  const classes = useStyles();
  const selectMyStore = (state: RootState) => state.designer
  const myStore = useSelector(selectMyStore)
  const{showOutline, showPaddingX, showPaddingY} = myStore;
  //相当于复制一个Json副本，不保存的话直接扔掉
  let nodes = parseNodes(myStore.pageJson?.layout);
  let canvas = new CanvasNode(nodes);
  const [fields, setFields] = useState<Array<any>>([]);

  useEffect(() => {
  let fieldsData = myStore.pageJson
    ?
    JSON.parse(JSON.stringify(myStore.pageJson?.fields))
    :
    [];   
    setFields(fieldsData)
  },[myStore.pageJson]);
  //复制一份出来，不保存的话直接扔掉


 
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

  const handleFieldsChange = (newFields:Array<any>)=>{
    setFields(newFields)
  }

  return (
    <Backdrop className={classes.backdrop} open={myStore.pageContentDesign}>
      <ThemeProvider theme={darkTheme}>
        <LeftArea fields={fields} onFieldsChange={handleFieldsChange}/>
      </ThemeProvider>
      <div 
        className = {classes.rightArea}
      >
        <ThemeProvider theme={darkTheme}>
          <TopNavHeightPlaceholder className={classes.toolbar}>
            <ToolbarIcon>
              <MdiIcon iconClass="mdi-layers-outline"/>
            </ToolbarIcon>
            <ToolbarIcon>
              <MdiIcon iconClass="mdi-file-cog-outline"/>
            </ToolbarIcon>
            {//<ToolbarIcon>
             // <MdiIcon iconClass="mdi-dock-bottom"/>
              //</ToolbarIcon>
            }
            <ToolbarIcon 
              checked={showOutline}
              onClick = {()=>{
                dispatch(showOutlineActon(!showOutline))
              }}
            >
              <MdiIcon iconClass="mdi-border-none-variant"/>
            </ToolbarIcon>
            <ToolbarIcon checked={showPaddingX}
              onClick = {()=>{
                dispatch(showPaddingXActon(!showPaddingX))
              }}
            >
              <MdiIcon iconClass="mdi-arrow-expand-horizontal"/>
            </ToolbarIcon>
            <ToolbarIcon checked={showPaddingY}
              onClick = {()=>{
                dispatch(showPaddingYActon(!showPaddingY))
              }}
              >
              <MdiIcon iconClass="mdi-arrow-expand-vertical"/>
            </ToolbarIcon>
            <ToolbarIcon>
              <MdiIcon iconClass="mdi-undo"/>
            </ToolbarIcon>
            <ToolbarIcon>
              <MdiIcon iconClass="mdi-redo"/>
            </ToolbarIcon>
            <ToolbarIcon>
              <MdiIcon iconClass="mdi-delete-outline"/>
            </ToolbarIcon>
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