import React from 'react';
import { makeStyles, Theme, createStyles, Fab, Hidden } from '@material-ui/core';
import MdiIcon from 'components/common/MdiIcon';
import { useLeftDrawer } from 'store/helpers/useAppStore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(1),
      zIndex:theme.zIndex.snackbar + 1,
      transition:'left 0.3s',
    },

  }),
);

export default function GraphQLDebug(){
  const classes = useStyles();
  const leftDrawer = useLeftDrawer();
  const fabLeft = leftDrawer.isMini ? leftDrawer.compactWidth : leftDrawer.fullWidth;
  return (
    <Hidden smDown>
      <Fab className={classes.fab} size="small" aria-label="GraphQL Debug" style={{left:(fabLeft + 8) + 'px'}}>
        <MdiIcon iconClass="mdi-graphql" color={'#e10098'} />
      </Fab>
    </Hidden>     
  )
}
