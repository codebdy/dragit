import { makeStyles, Theme, createStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
    },

  })
);

const ListViewEnumFilter = React.forwardRef((
    props:any, 
    ref:any
  )=>{

  const {
    children,
    ...rest
  } = props
  const classes = useStyles();
 
  return (
    <div
      className={classes.root}
      {...rest}
      ref= {ref}
    >
      枚举过滤器        
    </div>
  );
})

export default ListViewEnumFilter;

