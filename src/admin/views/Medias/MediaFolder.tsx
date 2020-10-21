import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton, Typography } from '@material-ui/core';
import MdiIcon from 'components/common/MdiIcon';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding:theme.spacing(1),
    },
    labelRoot: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
      marginRight: theme.spacing(1),
    },
    labelText: {
      fontWeight: 'inherit',
      flexGrow: 1,
      margintLeft:'4px',
    },  
    actions: {
      width:'76px',
      
    },  
  }),
);

const items:Array<FolderNode> = [
  {
    id:'1',
    name:'产品',
    children:[
      {
        id:'1-2',
        name:'二氯',
      },
      {
        id:'1-3',
        name:'三氯三氯三氯三氯',
      },
    ]
  },
  {
    id:'2',
    name:'文章',
  },
  {
    id:'3',
    name:'其他',
  },
]

interface FolderNode{
  id:string;
  name:string;
  children?:Array<FolderNode>;
}

function Folder(props:{node:FolderNode}){
  const {node} = props;
  const classes = useStyles();
  return(
    <TreeItem nodeId={node.id} label={
      <div className={classes.labelRoot}>
        <FolderOpenIcon />
        <Typography variant="body2" className={classes.labelText}>
          {node.name}
        </Typography>
        <div className={classes.actions}>
          <IconButton size = "small">
            <EditIcon fontSize = "small" />
          </IconButton>
          <IconButton size = "small">
            <AddIcon fontSize = "small" />
          </IconButton>
          <IconButton size = "small">
            <DeleteIcon fontSize = "small" />
          </IconButton>
        </div>
      </div>}
    >
      {
        node.children?.map((child)=>{
          return(
            <Folder node = {child} key={child.id} />
          )
        })
      }
    </TreeItem>

  )
}

export default function MediaFolder() {
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <TreeItem nodeId="root" label=
        {
          <div className={classes.labelRoot}>
            <MdiIcon iconClass = "mdi-folder-home-outline" size="22" />
            <Typography variant="body2" className={classes.labelText}>
              全部
            </Typography>
        </div>
        }
      >
        {
          items.map((node)=>{
            return <Folder node={node} key={node.id}/>
          })
        }
      </TreeItem>
    </TreeView>
  );
}
