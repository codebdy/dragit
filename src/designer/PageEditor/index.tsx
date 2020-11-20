import React, { Fragment, useEffect, useState } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import intl from 'react-intl-universal';
import classNames from 'classnames';
import Scrollbar from 'admin/common/Scrollbar';
import Spacer from 'components/common/Spacer';
import { showOutlineActon, showPaddingXActon, showPaddingYActon } from 'store/designer/actions';
import MdiIcon from 'components/common/MdiIcon';
import { PageSettings } from './SettingsBox';
import bus, { CANVAS_SCROLL } from './Core/bus';
import { CanvasNode } from './Core/Node/CanvasNode';
import { parseNodes } from './Core/Node/jsonParser';
import NodeView from './Core/Node/NodeView';
import ActiveLabel from './Core/Utils/ActiveLabel';
import FocusLabel from './Core/Utils/FocusLabel';
import MouseFollower from './Core/Utils/MouseFollower';
import NodeToolbar from './Core/Utils/NodeToolbar';
import DesignerLayout from 'designer/Layout';
import LeftContent from './LeftContent';
import useDesigner from 'store/designer/useDesigner';
import usePageMeta from 'admin/views/Page/usePageMeta';
import { API_GET_PAGE } from 'APIs/modules';
import { useAxios } from 'base/Hooks/useAxios';
import { IPage } from 'base/IPage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      display: 'flex',
      flexFlow: 'row',
      height:'100%',
    },


    toolboxIcon:{
      marginRight:theme.spacing(2),
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

export default function PageEditor(
  props:{
    pageId:number,
    onClose:()=>void
  }
) {
  const {pageId, onClose} = props;
  const classes = useStyles();
  const designer = useDesigner();
  const {showOutline, showPaddingX, showPaddingY} = designer;
  const [pageMeta] = useAxios<IPage>({...API_GET_PAGE, params:{pageId}});

  //相当于复制一个Json副本，不保存的话直接扔掉
  let nodes = parseNodes(pageMeta?.jsonSchema?.layout);
  let canvas = new CanvasNode(nodes);
  //const [pageSettings, setPageSettings] = useState<PageSettings|undefined>();

  const pageJson = pageMeta?.jsonSchema;

 /* useEffect(() => {
  let settingsData = pageJson?.settings
    ?
    JSON.parse(JSON.stringify(pageJson?.settings))
    :
    {
      isFormPage:false,
      api:'',
    };   
    setPageSettings(settingsData)
  },[pageJson]);*/
  //复制一份出来，不保存的话直接扔掉
 
  const dispatch = useDispatch()
  
  const handleCancel = () => {
    onClose();

  };

  const handleSave = () => {
    onClose();
  };

  const handleScroll = ()=>{
    bus.emit(CANVAS_SCROLL)
  }

  const handlSettingsChange = (newSettings:PageSettings)=>{
    //setPageSettings(newSettings)
  }

  return (
    <Backdrop className={classes.backdrop} open={true}>
      <DesignerLayout
        leftArea = {
          <LeftContent pageSchema={pageJson} onSettingsChange={handlSettingsChange}/>
        }

        toolbar = {
          <Fragment>
            <ToolbarIcon>
              <MdiIcon iconClass="mdi-layers-outline"/>
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
          </Fragment>
        }
      >
        <Scrollbar permanent className={classes.scrollBar} onScroll ={handleScroll}>
          <NodeView node={canvas} />
        </Scrollbar>
      </DesignerLayout>
      {
        <Fragment>
          <FocusLabel />
          <NodeToolbar />
          <ActiveLabel />
          <MouseFollower />
        </Fragment>
      }
    </Backdrop>
  );
}