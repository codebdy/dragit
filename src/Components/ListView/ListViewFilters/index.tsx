import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { Observer } from 'mobx-react-lite';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex:1,
      display:'flex',
      paddingTop:theme.spacing(1),
    },
  })
);

const ListViewFilters = React.forwardRef((
    props:any, 
    ref:any
  )=>{

  const {
    children,
    ...rest
  } = props
  const classes = useStyles();

  return (
    <Observer>
      {()=>
        <div
          className={classes.root}
          {...rest}
          ref= {ref}
        >
          {children}
        </div>
      }
    </Observer>
  );
})

export default ListViewFilters;

