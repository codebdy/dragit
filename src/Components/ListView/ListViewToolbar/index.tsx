import { makeStyles, Theme, createStyles, lighten, Toolbar } from '@material-ui/core';
import classNames from 'classnames';
import { Observer } from 'mobx-react-lite';
import React from 'react';
import { useListViewStore } from '../ListViewStore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      paddingRight: theme.spacing(1),
      display:'flex',
      flexFlow:'column',
      justifyContent:'center',
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
  }),
);

const ListViewToolbar = React.forwardRef((
    props:any, 
    ref:any
  )=>{

  const {
    children,
    ...rest
  } = props
  const classes = useStyles();
  const listViewStore = useListViewStore();
 
  return (
    <Observer>
      {()=>
        <div
          className={classNames(classes.root, {
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

