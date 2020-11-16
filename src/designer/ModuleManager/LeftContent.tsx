import React from 'react';
import LeftArea from 'designer/Layout/LeftArea';
import { makeStyles, Theme, createStyles, IconButton, Divider, LinearProgress } from '@material-ui/core';
import ModuleList from './ModuleList';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      width:'100%',
      height:'100%',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      fontSize:'1.2rem',
      fontWeight:'bold',
    },

    addArea:{
      display:'flex',
      justifyContent:'center',
      padding:theme.spacing(1),
    }

  }),
);

export default function LeftContent(){
  const classes = useStyles();
  return (
    <LeftArea
      title={
        <div className = {classes.title}>
          模块列表
        </div>
      }
    >
      <LinearProgress />
      <div>
        <ModuleList />
      </div>
      <Divider />
      <div className={classes.addArea}>
        <IconButton >
          <AddIcon />
        </IconButton>
       </div>
    </LeftArea>
  )
}
