import React from 'react';
import { makeStyles, Theme, createStyles, IconButton, Typography } from '@material-ui/core';
import { TreeItem } from '@material-ui/lab';
import AddIcon from '@material-ui/icons/Add';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    labelRoot: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0.5, 0),
      height:'30px',
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

export function FolderLabel(props:{children:any}){
  const classes = useStyles();

  return(
    <Typography variant="body2" className={classes.labelText}>
      {props.children}
    </Typography>    
  )
}

export function FolderActions(props:{children:any}){
  const classes = useStyles();

  return(
    <div className={classes.actions}>
      {props.children}
    </div>    
  )
}


export default function MediaFolder (props:{node:FolderNode}){
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
        <FolderLabel>
          {node.name}
        </FolderLabel>
        {
          hover&&
          <FolderActions>
            <IconButton size = "small">
              <EditIcon fontSize = "small" />
            </IconButton>
            <IconButton size = "small">
              <AddIcon fontSize = "small" />
            </IconButton>
            <IconButton size = "small">
              <DeleteIcon fontSize = "small" />
            </IconButton>
          </FolderActions>
        }
      </div>}
    >
      {
        node.children?.map((child)=>{
          return(
            <MediaFolder node = {child} key={child.id} />
          )
        })
      }
    </TreeItem>

  )
}