import React from 'react';
import { makeStyles, Theme, createStyles, Grid, Hidden, IconButton, SvgIcon } from '@material-ui/core';
import { MediasBreadCrumbItems } from './MediasBreadCrumbItems';
import { FolderNode } from "./FolderNode";
import { observer } from 'mobx-react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    breadCrumbShell:{
      minHeight:theme.spacing(7),
      //boxShadow: theme.shadows[5],
    },
    
    backButton:{
      marginLeft:'2px',
    },

  }),
);

export const MediasBreadCrumbs = observer((
  props:{
    selectedFolder:string,
    selectedFolderNode:FolderNode|undefined,
  }
)=>{
  const {selectedFolder,selectedFolderNode} = props;
  const classes = useStyles();
  return (
    <Grid container justify="space-between" alignItems="center" className={classes.breadCrumbShell}>
      <Grid item>
        <IconButton className={classes.backButton}
          disabled = {selectedFolder === 'root'}
          onClick={
            ()=>{
              //onSelect(selectedFolderNode?.parent? selectedFolderNode.parent.id : 'root')
            }
          }
        >
          <SvgIcon>
            <path fill="currentColor" d="M13,18V10L16.5,13.5L17.92,12.08L12,6.16L6.08,12.08L7.5,13.5L11,10V18H13M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2Z" />
          </SvgIcon>                    
        </IconButton>                  
      </Grid>
      <Grid item>
          <MediasBreadCrumbItems folder={selectedFolderNode} 
            //onSelect = {onSelect} 
          />
      </Grid>
      <Grid item>                  
      <Hidden lgUp>
          <IconButton>
            <SvgIcon>
              <path fill="currentColor" d="M20 6H12L10 4H4A2 2 0 0 0 2 6V18A2 2 0 0 0 4 20H20A2 2 0 0 0 22 18V8A2 2 0 0 0 20 6M20 18H4V8H20M13 17V14H15V17H17V13H19L14 9L9 13H11V17Z" />
            </SvgIcon>                    
          </IconButton>
        </Hidden>
      </Grid>
    </Grid>
  )
})
