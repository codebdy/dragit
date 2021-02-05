import React from 'react';
import { makeStyles, Theme, createStyles, Drawer, Divider, IconButton, Typography } from '@material-ui/core';
import MdiIcon from 'Components/common/MdiIcon';
import { Close } from '@material-ui/icons';
import intl from 'react-intl-universal';
import Scrollbar from 'Common/Scrollbar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { TreeView } from '@material-ui/lab';
import {observer} from "mobx-react";
import { useModelStore } from 'Base/ModelTree/ModelProvider';
import { ModelTreeNode } from './ModelTreeNode';
import { ModelSelector } from './ModelSelector';
import { useDebugStore } from '../DebugStore';

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
      padding:theme.spacing(1),
      display:'flex',
      flexFlow:'row',
      minWidth:'280px',
    },
  }),
);

export const DebugModelTree = observer((
  props:{
    open?:boolean,
    onClose?:()=>void,
  }
)=>{
  const {open, onClose} = props;
  const classes = useStyles();
  const modelStore = useModelStore();
  const debugStore = useDebugStore();

  return (
    <Drawer anchor="left" variant="persistent" open={open} onClose={onClose}>
      <div className = {classes.title}>
        <MdiIcon iconClass="mdi-file-tree" />        
        <Typography className={classes.titleText} variant="h6">Model Tree {intl.get('debug')}</Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <Close />
        </IconButton>
      </div>
      <Divider />
      <Scrollbar > 
        <div className={classes.content}>
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            selected = {debugStore?.selectedModel?.id || ''}
          >
            {
              modelStore?.getChildren()?.map((childStore, index)=>{
                return (
                  <ModelTreeNode 
                    key = {childStore.id} 
                    modelNode = {childStore} 
                  />
                )
              })
            }
          </TreeView>
        </div>
        <ModelSelector/>
      </Scrollbar>
    </Drawer>
  )
})
