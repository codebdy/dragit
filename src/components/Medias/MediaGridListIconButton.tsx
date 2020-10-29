import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import MdiIcon from 'components/common/MdiIcon';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width:'24px',
      height:'24px',
      borderRadius:'50%',
      background:"rgba(0,0,0, 0.3)",
      cursor:'pointer',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      margin:theme.spacing(0.2),
    },

  }),
);

export default function MediaGridListIconButton(props:{icon:string, onClick:()=>void}){
  const {icon, onClick} = props;
  const classes = useStyles();
  return (
    <div className={classes.root} 
      onClick = {(e)=>{
       onClick();
       e.stopPropagation();
      }}>
      <MdiIcon iconClass = {icon} color="#f7f7f7" size={14} />
    </div>
  )
}
