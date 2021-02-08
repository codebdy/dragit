import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
    },
  }),
);


export const TemplateManager = observer(() => {
  const classes = useStyles();

  return (
    <div className = {classes.root}>

    </div>
  );
})
