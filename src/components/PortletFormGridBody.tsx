import React from 'react';
import { makeStyles, Theme, createStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    portletBody: {
      padding:theme.spacing(2),
    },

  }),
);

const PortletFormGridBody = React.forwardRef((props:{children:any}, ref:any) => {
  const classes = useStyles();
  return (
    <Grid container spacing={3} className={classes.portletBody} ref={ref}>
      {props.children}
    </Grid>
  )
});
export default  PortletFormGridBody

