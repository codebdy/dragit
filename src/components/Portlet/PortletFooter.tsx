import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import classNames from 'classnames';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    portletFooter: {
      padding:theme.spacing(2),
    },

  }),
);


const PortletFooter = React.forwardRef((props:{children:any, className:string}, ref:any) => {
  const {children, className, ...rest} = props
  const classes = useStyles();
  return (
    <div className={classNames(classes.portletFooter,className )} {...rest} ref={ref}>
      {children}
    </div>
  )
});
export default PortletFooter;