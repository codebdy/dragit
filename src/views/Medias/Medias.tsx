import React from "react";
import { makeStyles, Theme, createStyles, Container, } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

export default function Medias(props:{children?: any}) {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      Medias

    </Container>
  )
}