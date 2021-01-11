import { makeStyles, Theme, createStyles } from '@material-ui/core';
import classNames from 'classnames';
import { Observer } from 'mobx-react';
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
    className,
    children,
    ...rest
  } = props
  const classes = useStyles();

  return (
    <Observer>
      {()=>
        <div
          className={classNames(className, classes.root)}
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

