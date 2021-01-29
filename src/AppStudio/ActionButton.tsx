import React from 'react';
import { makeStyles, Theme, createStyles, useTheme, IconButton } from '@material-ui/core';
import MdiIcon from 'Components/Common/MdiIcon';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width:'40px',
      height:'40px',
      display:'flex',
      alignItems:'center',
    },
  }),
);

export default function ActionButton(
  props:{
    onClick:(event: React.MouseEvent<HTMLElement>)=>void,
    icon:string,
  }
){
  const {onClick, icon} = props;
  const classes = useStyles();
  const theme = useTheme();
  return (
    <IconButton 
      size = "small" 
      className={classes.root}
      onClick = {onClick}
    >
      <MdiIcon iconClass={icon} size={20} color = {theme.palette.text.secondary}/>
    </IconButton>
  )
}
