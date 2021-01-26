import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import Scrollbar from 'AdminBoard/Common/Scrollbar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      display:'flex',
      flexFlow:'column',
    },
  }),
);


export const Auths = observer(() => {
  const classes = useStyles();

  return (
    <Scrollbar className = {classes.root}>
      Auths
    </Scrollbar>
  );
})
