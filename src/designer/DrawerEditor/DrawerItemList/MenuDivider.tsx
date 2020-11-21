import React from 'react';
import { makeStyles, Theme, createStyles, Divider } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

    },

  }),
);

export default function MenuDivider(){
  const classes = useStyles();
  return (
    <Divider />
  )
}
