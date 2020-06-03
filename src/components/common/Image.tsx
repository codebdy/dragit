import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imageRoot: {
      width:'100%',
      paddingBottom:'100%',
      backgroundRepeat:'no-repeat',
      backgroundPosition:'center',
      backgroundSize:'cover',
    },

  }),
);

export default function Image(props:{src?:string, borderRadius?:string}){
  const {src, borderRadius = '5px'} = props;
  const classes = useStyles();
  return (
    <div className = {classes.imageRoot}
      style = {{
        backgroundImage:`url(${src})`,
        borderRadius: borderRadius,
      }}
    >
    </div>
  )
}
