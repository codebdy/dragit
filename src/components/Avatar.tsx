import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    spacer: {
      flex:1,
    },

  }),
);

const Avatar = React.forwardRef((props: {}, ref:any)=>{
  const classes = useStyles();
  return (
    <div className={classes.spacer} ref = {ref}>
    </div>
  )
})

export default Avatar
