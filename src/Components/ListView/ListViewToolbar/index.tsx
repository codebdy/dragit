import { makeStyles, Theme, createStyles, lighten, fade } from '@material-ui/core';
import classNames from 'classnames';
import { Observer } from 'mobx-react';
import React from 'react';
import { useListViewStore } from '../ListViewStore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
      display:'flex',
      flexFlow:'column',
      justifyContent:'center',
      minHeight:theme.spacing(10),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: fade(theme.palette.secondary.dark, 0.5),
          },
  }),
);

const ListViewToolbar = React.forwardRef((
    props:any, 
    ref:any
  )=>{

  const {
    className,
    children,
    ...rest
  } = props
  const classes = useStyles();
  const listViewStore = useListViewStore();
 
  return (
    <Observer>
      {()=>
        <div
          className={classNames(classes.root, className, {
            [classes.highlight]: listViewStore.selects.length > 0,
          })}
          {...rest}
          ref= {ref}
        >
          {children}
        </div>
      }
    </Observer>
  );
})

export default ListViewToolbar;

