import React, { Fragment } from 'react';
import { useAppStore } from 'Store/Helpers/useAppStore';
import {observer} from 'mobx-react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      outline:'dashed green 2px',
      pointerEvents:'none',
    },

  }),
);
export const ModelSelector = observer(() => {
  const classes = useStyles();
  const appStore = useAppStore();

  const selectedDom = document.querySelector(`[data-rxid="${appStore.selectModelComponentRxid}"]`);
  const rect = selectedDom?.getBoundingClientRect();

  return (
    appStore.selectModelComponentRxid && rect
    ? <div 
        className={classes.root}
        style = {{
          left: Math.round(rect.left) + 'px',
          top: Math.round(rect.top) + 'px',
          width: Math.round(rect.width) + 'px',
          height: Math.round(rect.height) + 'px',
        }}
      ></div>
    : <Fragment></Fragment>
  );
})
