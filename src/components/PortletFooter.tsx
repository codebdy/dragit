import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    portletFooter: {
      padding:theme.spacing(2),
    },

  }),
);


const PortletFooter = React.forwardRef((props:{children:any}, ref:any) => {
  const classes = useStyles();
  return (
    <div className={classes.portletFooter}>
      {props.children}
    </div>
  )
});
export default PortletFooter;