import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    optionSelect: {

    },

  }),
);

export default function OptionSelect(){
  const classes = useStyles();
  return (
    <div className={classes.optionSelect}>
    </div>
  )
}
