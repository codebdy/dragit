import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles, AppBar, IconButton, Toolbar, Typography, Container } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useHistory } from 'react-router';
import intl from "react-intl-universal";
import DrawerItemList from './DrawerItemList';
import ToolsAccordion from './ToolsAccordion';
import IMenuItem from 'Base/Model/IMenuItem';
import { RXNode } from 'Base/RXNode/RXNode';
import SiderBarLoadingSkeleton from 'AdminBoard/Sidebar/LoadingSkeleton';
import NodeEditor from './NodeEditor';
import { AUTH_CUSTOMIZE } from 'Base/authSlugs';
import { ID } from 'Base/Model/graphqlTypes';
import { GET_DRAWER, SAVE_DRAWER } from 'Base/GraphQL/GQLs';
import { useMutation, useQuery } from '@apollo/react-hooks';
import SubmitButton from 'Components/Common/SubmitButton';
import { useAppStore } from 'Store/Helpers/useAppStore';
import { useAuthCheck } from 'Store/Helpers/useAuthCheck';
import { useShowAppoloError } from 'Store/Helpers/useInfoError';
import { cloneObject } from 'Utils/cloneObject';

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
  }),
);

export default function DrawerEditor(){
  const classes = useStyles();
  const history = useHistory();
  const { loading, error, data } = useQuery(GET_DRAWER);
  const [rootNode,setRootNode] = React.useState(new RXNode<IMenuItem>());
  const [selectedNode, setSelectedNode] = useState<RXNode<IMenuItem>>();
  const [draggedNode, setDraggedNode] =  useState<RXNode<IMenuItem>>();
  const appStore = useAppStore();

  const [excuteSave, {error:saveError, loading:saving}] = useMutation(SAVE_DRAWER,{
    onCompleted:(data)=>{
      appStore.setSuccessAlert(true)
    }});
  //const [saveRequest, setSaveRequest] = useState<AxiosRequestConfig>();
  //const [, saving] = useAxios<Array<IMenuItem>>(saveRequest, true);

  useAuthCheck(AUTH_CUSTOMIZE);
  useShowAppoloError(error||saveError);
  
  useEffect(()=>{
    rootNode.parse(cloneObject(data?.drawer?.items||[]));
    setRootNode(rootNode.copy());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[data]);

  const handleClose = ()=>{
    history.goBack();
  }

  const handleSave = ()=>{
    const drawerData = rootNode.getChildrenMetas();
    excuteSave({variables:{items:drawerData}})
  }

  const handleSelectedNode = (node:RXNode<IMenuItem>)=>{
    setSelectedNode(node);
  }

  const handleMetaChange = (node:RXNode<IMenuItem>, field:string, value:any)=>{
    let copy = rootNode.copy()
    let targetNode = copy.getNode(node.id);
    targetNode?.meta && (targetNode.meta[field] = value);
    setRootNode(copy);
    setSelectedNode(targetNode);
  }

  const handleStartDragNode = (node:RXNode<IMenuItem>)=>{
    setDraggedNode(node);
  }

  const handleDragEnd = ()=>{
    setDraggedNode(undefined);
  }

  const doDrag = (funciontName :string, targetId:ID)=>{
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

  const handleDragToBefore = (targetId:ID)=>{
    doDrag('moveBefore', targetId);
  }

  const handleDragToAfter = (targetId:ID)=>{
    doDrag('moveAfter', targetId);
  }

  const handleDragIn = (targetId:ID)=>{
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
    node?.remove();
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
          
          <SubmitButton
            variant = "contained"
            color = "primary"         
            size="large"
            onClick={handleSave} 
            submitting={saving}
          >
            {intl.get('save')}
          </SubmitButton>
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
