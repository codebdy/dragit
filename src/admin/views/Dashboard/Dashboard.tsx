import React from "react";
import { Grid, makeStyles, Theme, createStyles, Container, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    welcomeTitle: {
      marginTop: theme.spacing(5),
    },
  }),
);

export default function Dashboard(props:{children?: any}) {
  const classes = useStyles();
  return (
    <Container>
      <Grid container spacing={3} justify = "center">
        <Grid item>
          <Typography variant = "h2" className={classes.welcomeTitle}>欢迎使用 DragRx!</Typography>
        </Grid>
      </Grid>
    </Container>
  )
}