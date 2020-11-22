import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles, AppBar, Button, IconButton, Toolbar, Typography, Container, CircularProgress } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useHistory } from 'react-router';
import intl from "react-intl-universal";
import DrawerItemList from './DrawerItemList';
import ToolsAccordion from './ToolsAccordion';
import { API_GET_DRAWER, API_SAVE_DRAWER } from 'APIs/drawer';
import { useAxios } from 'base/Hooks/useAxios';
import IMenuItem from 'base/IMenuItem';
import { RXNode } from 'base/RXNode/RXNode';
import SiderBarLoadingSkeleton from 'admin/Sidebar/LoadingSkeleton';
import NodeEditor from './NodeEditor';
import { RXNodeRoot } from 'base/RXNode/Root';
import { AxiosRequestConfig } from 'axios';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width:'100%',
      height:'100%',
      display:'flex',
      flexFlow:'column',
      background: theme.palette.background.default,
    },
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
      color: theme.palette.text.primary,
    },
    saveButton:{
      color: theme.palette.text.primary,
    },
    content:{
      //flex:1,
      height:'100%',
      display:'flex',
      padding:theme.spacing(2),
    },
    left:{
      flex:'1',
      paddingRight:theme.spacing(3),
      marginTop:theme.spacing(2),
    },
    center:{
      width:'360px',
      border:'solid 2px rgba(0,0,0, 0.3)',
      backgroundColor: theme.palette.background.paper,
      display:'flex',
      flexFlow:'column', 
    },
    right:{
      flex:'1',
      paddingLeft:theme.spacing(5),
    },
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
    },    
    buttonProgress: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  }),
);

export default function DrawerEditor(){
  const classes = useStyles();
  const history = useHistory();
  const [metas, loading] = useAxios<Array<IMenuItem>>(API_GET_DRAWER);
  const [rootNode,setRootNode] = React.useState(new RXNodeRoot<IMenuItem>());
  const [selectedNode, setSelectedNode] = useState<RXNode<IMenuItem>>();
  const [draggedNode, setDraggedNode] =  useState<RXNode<IMenuItem>>();
  const [saveRequest, setSaveRequest] = useState<AxiosRequestConfig>();
  const [, saving] = useAxios<Array<IMenuItem>>(saveRequest, true);

  useEffect(()=>{
    metas && rootNode.parse(metas);    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[metas]);

  const handleClose = ()=>{
    history.goBack();
  }

  const handleSave = ()=>{
    const drawerData = rootNode.getRootMetas();
    setSaveRequest({...API_SAVE_DRAWER, data:drawerData})
  }

  const handleSelectedNode = (node:RXNode<IMenuItem>)=>{
    setSelectedNode(node);
  }

  const handleMetaChange = (node:RXNode<IMenuItem>, field:string, value:any)=>{
    let copy = rootNode.copy()
    let targetNode = copy.getNode(node.id);
    targetNode?.meta && (targetNode.meta[field] = value);
    setRootNode(copy);
  }

  const handleStartDragNode = (node:RXNode<IMenuItem>)=>{
    setDraggedNode(node);
  }

  const handleDragEnd = ()=>{
    setDraggedNode(undefined);
  }

  const doDrag = (funciontName :string, targetId:number)=>{
    if(!draggedNode){
      return;
    }

    let copy = rootNode.copy()
    let targetNode = copy.getNode(targetId);
    if(!targetNode){
      return;
    }

    let node = copy.getNode(draggedNode.id) || draggedNode;
    let nodeAny = node as any;
    nodeAny[funciontName](targetNode);      

    setRootNode(copy);    
  }

  const handleDragToBefore = (targetId:number)=>{
    doDrag('moveBefore', targetId);
  }

  const handleDragToAfter = (targetId:number)=>{
    doDrag('moveAfter', targetId);
  }

  const handleDragIn = (targetId:number)=>{
    doDrag('moveIn', targetId);
  }

  const handleOverTopDragOver = (event: React.DragEvent<unknown>)=>{
    event.preventDefault();
  }

  const handleOverTopDop = (event: React.DragEvent<unknown>)=>{
    event.preventDefault();
    if(!draggedNode){
      return;
    }
    let copy = rootNode.copy();
    let node = copy.getNode(draggedNode.id);
    node?.removeFormParent();
    if(draggedNode.id === selectedNode?.id){
      setSelectedNode(undefined);
    }
    setRootNode(copy); 
  }

  const handleDragOver = (event: React.DragEvent<unknown>)=>{
    event.preventDefault();
    event.stopPropagation();
    if(!draggedNode || rootNode.children.length > 0){
      return;
    }
    let copy = rootNode.copy();
    draggedNode?.moveIn(copy);
    setRootNode(copy);     
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} color="inherit">
        <Toolbar>
          <IconButton edge="start" onClick={handleClose} aria-label="close">
            <Close fontSize="large"/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {intl.get('edit-drawer')}
          </Typography>
          <div className={classes.wrapper}>
            <Button className={classes.saveButton} 
              onClick={handleSave} size="large"style={{fontSize:'1.2rem'}}
              disabled={saving}
            >
              {intl.get('save')}
            </Button>
            {saving && <CircularProgress color = "primary" size={24} className={classes.buttonProgress} />}
          </div>
        </Toolbar>
      </AppBar>
      <Container className={classes.content} onDragOver={handleOverTopDragOver} onDrop={handleOverTopDop}>
        <div className = {classes.left}>
          {selectedNode && <NodeEditor node = {selectedNode} onChange = {handleMetaChange} />}
        </div>
        <div className = {classes.center}
          onDrop = {(event: React.DragEvent<unknown>)=>{event.stopPropagation()}}
          onDragOver = {handleDragOver}
        >
          {
            loading?
            <SiderBarLoadingSkeleton />
            :
            <DrawerItemList 
              nodes={rootNode.children} 
              draggedNode = {draggedNode}
              onSelected = {handleSelectedNode}
              onDragToBefore = {handleDragToBefore}
              onDragToAfter = {handleDragToAfter}
              onDragStart = {handleStartDragNode}
              onDragEnd = {handleDragEnd}
              onDragIn = {handleDragIn}
            />
          }
        </div>
        <div className = {classes.right}>
          <ToolsAccordion onStartDragNode={handleStartDragNode} onEndDragNode = {handleDragEnd}/>
        </div>
      </Container>
    </div>
  ) 
}
