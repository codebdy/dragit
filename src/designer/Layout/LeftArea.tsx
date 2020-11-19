import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import Scrollbar from 'admin/common/Scrollbar';
import { sideBarSettings } from 'utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    leftArea:{
      display:'flex',
      flexFlow:'column',
      height:'100%',
      background: '#1a1a27',
      //boxShadow: '0px 10px 13px -6px rgba(0,0,0,0.2), 0px 20px 31px 3px rgba(0,0,0,0.14), 0px 8px 38px 7px rgba(0,0,0,0.12)',
      zIndex:theme.zIndex.drawer + 1,
      color:"#f7f7f7",
      width:sideBarSettings.sizes.medium,
    },
    leftTitle:{
      padding: theme.spacing(0),
      //fontSize: '1.1rem',
      //borderBottom:"rgba(0,0,0, .4) solid 2px",
      display:'flex',
      flexFlow:'row',
      alignItems:"flex-end",
      height:'63px',
      background: 'rgba(0,0,0,0.3)',
      boxShadow: theme.shadows[6],
    },
  }),
);

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}


export default function LeftArea(props:{title?:any, children?:any}){
  const {title, children} = props;
  const classes = useStyles();

  return (
    <div className={classes.leftArea}>
      <div className={classes.leftTitle}>
        {title}
      </div>
      <Scrollbar>
        {children}
      </Scrollbar>
  </div>
  )
}
