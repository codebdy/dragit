import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { Formik } from 'formik';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
    },

  }),
);

export default function PageForm(props:{children?:any}){
  const classes = useStyles();
  return (
    <form>
      {props.children}
    </form>
  )
}
