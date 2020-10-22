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
import intl from 'react-intl-universal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding:theme.spacing(1),
    },
    labelRoot: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0.5, 0),
      height:'30px',
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
      textAlign:'center',
    },  
  }),
);

export interface FolderNode{
  id:string;
  name:string;
  children?:Array<FolderNode>;
}

function Folder(props:{node:FolderNode}){
  const {node} = props;
  const classes = useStyles();
  const [hover, setHover] = React.useState(false);

  return(
    <TreeItem nodeId={node.id} label={
      <div 
        className={classes.labelRoot}
        onMouseOver = {()=>setHover(true)}
        onMouseLeave = {()=>setHover(false)}
      >
        <FolderOpenIcon />
        <Typography variant="body2" className={classes.labelText}>
          {node.name}
        </Typography>
        {
          hover&&
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
        }
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

export default function MediaFolder(props:{folders:Array<FolderNode>, selectedFolder:string, onSelect:(node:string)=>void}) {
  const {folders, selectedFolder, onSelect} = props;
  const classes = useStyles();
  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      selected = {selectedFolder}
      onNodeSelect = {(e: any, nodeId: string) =>{
        onSelect(nodeId);
      }}
    >
      <TreeItem nodeId="root" label=
        {
          <div className={classes.labelRoot}>
            <MdiIcon iconClass = "mdi-folder-home-outline" size="22" />
            <Typography variant="body2" className={classes.labelText}>
              {intl.get('all')}
            </Typography>
            <div className={classes.actions}>
              <IconButton size = "small">
                <AddIcon fontSize = "small" />
              </IconButton>
            </div>
        </div>
        }
      >
        {
          folders.map((node)=>{
            return <Folder node={node} key={node.id}/>
          })
        }
      </TreeItem>
    </TreeView>
  );
}
