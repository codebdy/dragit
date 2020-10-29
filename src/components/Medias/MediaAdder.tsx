import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import MdiIcon from 'components/common/MdiIcon';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width:"100%",
      paddingBottom:'100%',
      position:"relative",
      borderRadius:"5px",
      background:"rgba(93, 32, 255, 0.2)",
      cursor:"pointer",
      "&:hover":{
        background:"rgba(93, 32, 255, 0.3)",
      }
    },

    inner:{
      position:"absolute",
      width:"calc(100% - 20px)",
      height:"calc(100% - 20px)",
      border:"#5d78ff dashed 2px",
      top:'10px',
      left:'10px',
      display:"flex",
      justifyContent:"center",
      alignItems:"center"
    }

  }),
);

export default function MediaAdder(props:{onClick:()=>void}){
  const classes = useStyles();
  return (
    <div className={classes.root} onClick = {props.onClick}>
      <div className={classes.inner}>
        <MdiIcon iconClass="mdi-plus" color="#5d78ff" size="50"/>
      </div>
    </div>
  )
}
