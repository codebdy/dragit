import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles, AppBar, Button, IconButton, Toolbar, Typography, Container, Grid } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useHistory } from 'react-router';
import intl from "react-intl-universal";
import DrawerItemList from './DrawerItemList';
import ToolsAccordion from './ToolsAccordion';
import { API_GET_DRAWER } from 'APIs/drawer';
import { useAxios } from 'base/Hooks/useAxios';
import IMenuItem from 'base/IMenuItem';
import { RXNode } from 'base/RXNode';
import { parseRXNodeList } from 'base/RXNodeParser';
import SiderBarLoadingSkeleton from 'admin/Sidebar/LoadingSkeleton';
import NodeEditor from './NodeEditor';
import { number } from 'yup';

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
    }
  }),
);

export default function DrawerEditor(){
  const classes = useStyles();
  const history = useHistory();
  const [jsonData, loading] = useAxios<Array<IMenuItem>>(API_GET_DRAWER);
  const [nodes,setNodes] = React.useState<Array<RXNode<IMenuItem>>>([]);
  const [selectedNode, setSelectedNode] = useState<RXNode<IMenuItem>>();

  useEffect(()=>{
    jsonData && setNodes(parseRXNodeList<IMenuItem>(jsonData));    
  },[jsonData]);


  const handleClose = ()=>{
    history.goBack();
  }

  const handleSave = ()=>{

  }

  const handleSelectedNode = (node:RXNode<IMenuItem>)=>{
    setSelectedNode(node);
  }

  const handleMetaChange = (node:RXNode<IMenuItem>, field:string, value:any)=>{
    node.meta[field] = value;
    setNodes([...nodes])
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
          <Button className={classes.saveButton} onClick={handleSave} size="large"style={{fontSize:'1.2rem'}}>
            {intl.get('save')}
          </Button>
        </Toolbar>
      </AppBar>
      <Container className={classes.content}>
        <Grid container className = {classes.left} spacing = {2}>
          {selectedNode && <NodeEditor node = {selectedNode} onChange = {handleMetaChange} />}
        </Grid>
        <div className = {classes.center}>
          {
            loading?
            <SiderBarLoadingSkeleton />
            :
            <DrawerItemList nodes={nodes} onSelected = {handleSelectedNode} />
          }
        </div>
        <div className = {classes.right}>
          <ToolsAccordion />
        </div>
      </Container>
    </div>
  )
}
