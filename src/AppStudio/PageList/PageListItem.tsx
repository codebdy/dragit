import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
    },
  }),
);


export const PageListItem = observer((
  props:{
    children?:string | JSX.Element | Array<JSX.Element>,
    itemAction?:string|JSX.Element,
  }
) => {
  const {children, itemAction} = props;
  const classes = useStyles();

  return (
    <div className = {classes.root}>
      {children}
      <div>
        {itemAction}
      </div>
    </div>
  );
})
