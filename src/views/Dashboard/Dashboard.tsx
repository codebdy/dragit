import React from "react";
import { Grid, Paper, makeStyles, Theme, createStyles, Container, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, Card, Input } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    paper: {
      padding: theme.spacing(2),
      //textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

export default function Dashboard(props:{children?: any}) {
  const classes = useStyles();
  return (
    <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper} elevation={6}>
            <form className={classes.root} noValidate autoComplete="off">
              <Input defaultValue="Hello world" fullWidth inputProps={{ 'aria-label': 'description' }} />
              <Input placeholder="Placeholder" inputProps={{ 'aria-label': 'description' }} />
              <Input defaultValue="Disabled" disabled inputProps={{ 'aria-label': 'description' }} />
              <Input defaultValue="Error" error inputProps={{ 'aria-label': 'description' }} />
            </form>

            </Paper>
          </Grid>
          <Grid item xs={6}>
         
            <ExpansionPanel elevation={6}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Expansion Panel 1</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                  sit amet blandit leo lobortis eget.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
          <Grid item xs={6}>
            <Card className={classes.paper} elevation={6}>Card</Card>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper} elevation={6}>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper} elevation={6}>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper} elevation={6}>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper} elevation={6}>xs=3</Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>xs=12</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>xs=6</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>xs=6</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>xs=12</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>xs=6</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>xs=6</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
        </Grid>
    </Container>
  )
}