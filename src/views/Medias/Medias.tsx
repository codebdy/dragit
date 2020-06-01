import React from "react";
import { makeStyles, Theme, createStyles, Container, Grid, Card } from "@material-ui/core";

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
      <h2>媒体库</h2>
      <Grid container>
        <Grid item xs={12}>
          <Card style={{padding:'10px',}}>ddd</Card>
        </Grid>
      </Grid>
    </Container>
  )
}