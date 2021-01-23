import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import { VerticalBar } from './VerticalBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      display:'flex',
      flexFlow:'row',
      alignItems:'stretch',
      height:'100%',
      flexGrow:1,
    },
  }),
);

export const AppStudio = observer(() => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <VerticalBar />
    </div>
  );
})
