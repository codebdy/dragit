import React from 'react';
import { makeStyles, Theme, createStyles, Breadcrumbs, Link, Typography } from '@material-ui/core';
import intl from 'react-intl-universal';
import classNames from 'classnames';
import { FolderNode } from './MediaFolder';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    breadcrumb:{
      padding: theme.spacing(2),
    },
    breadcumbText:{
      fontSize: '0.9rem',
    },
    crumbLink:{
      cursor:"pointer"
    },

  }),
);

function makeupLinkCrumbs(folder?:FolderNode, allCrumbs?:Array<FolderNode>){
  allCrumbs = allCrumbs ? allCrumbs : [];
  if(folder && folder.parent){
    allCrumbs.unshift(folder.parent);
    makeupLinkCrumbs(folder.parent, allCrumbs);
  }
  return allCrumbs
}

export default function MediaBreadCrumbs(props:{folder?:FolderNode, onSelect:(node:string)=>void}){
  const {folder, onSelect} = props;
  const classes = useStyles();
  const linkCrumbs = makeupLinkCrumbs(folder);
  return (
    <Breadcrumbs aria-label="breadcrumb" 
    className={classNames(classes.breadcrumb, classes.breadcumbText) }
  >
    {
      folder?
      <Link color="inherit" className={classes.crumbLink}
        onClick={()=>{onSelect('root')}}
      >
      {intl.get('root-dir')}
      </Link>
      :
      <Typography color="textPrimary" className={classes.breadcumbText}>
        {intl.get('root-dir')}
      </Typography>      
    }
    {
      linkCrumbs.map(crumb=>{
        return(
          <Link 
            color="inherit" 
            className={classes.crumbLink}
            key={crumb.id}
            onClick={()=>{onSelect(crumb.id)}}
          >{crumb.name}</Link>
        )
      })
    }
    {
      folder&&
      <Typography color="textPrimary" className={classes.breadcumbText}>{folder?.name}</Typography>
    }
    
    
  </Breadcrumbs>
  )
}
