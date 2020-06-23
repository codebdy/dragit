import React from 'react';
import { makeStyles, Theme, createStyles, Grid } from '@material-ui/core';
import classNames from 'classnames';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    portletBody: {
      padding:theme.spacing(2),
    },

  }),
);

const PortletFormGridBody = React.forwardRef((props:{children:any, className:any,}, ref:any) => {
  const {className, ...rest} = props
  const classes = useStyles();
  return (
    <Grid container spacing={3} className={ classNames(classes.portletBody, className) } {...rest} ref={ref}>
      {props.children}
    </Grid>
  )
});
export default  PortletFormGridBody

