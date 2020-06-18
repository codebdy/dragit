import React from "react";
import { Grid, Paper, makeStyles, Theme, createStyles, Container, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, Card, Input, FormControl, InputLabel, InputAdornment } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FormikExample from '../FormikExample';

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
    margin: {
      margin: theme.spacing(1),
    },
  }),
);

export default function Dashboard(props:{children?: any}) {
  const classes = useStyles();
  return (
    <Container>
      
      <form className={classes.root} noValidate autoComplete="off">
        
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper} elevation={6}>
            <FormikExample />  
            <div>
                <FormControl className={classes.margin}>
                  <InputLabel htmlFor="input-with-icon-adornment">With a start adornment</InputLabel>
                  <Input
                    id="input-with-icon-adornment"
                    startAdornment={
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <TextField
                  className={classes.margin}
                  id="input-with-icon-textfield"
                  label="TextField"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
                <div className={classes.margin}>
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <AccountCircle />
                    </Grid>
                    <Grid item>
                      <TextField id="input-with-icon-grid" label="With a grid" />
                    </Grid>
                  </Grid>
                </div>
              </div>


              <TextField id="standard-basic" required label="Standard" variant="outlined" fullWidth size="small" multiline rows = {10}/>
              <TextField required label="Test" variant="outlined" size="small" />
              <TextField required label="Test" error variant="outlined" size="small" helperText="error text" />
              <TextField
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
              />
              <TextField
                id="filled-number"
                label="Number"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
              <Input defaultValue="Hello world" fullWidth inputProps={{ 'aria-label': 'description' }} />
              <Input placeholder="Placeholder" inputProps={{ 'aria-label': 'description' }} />
              <Input defaultValue="Disabled" disabled inputProps={{ 'aria-label': 'description' }} />
              <Input defaultValue="Error" error inputProps={{ 'aria-label': 'description' }} />
            

            </Paper>
          </Grid>
          <Grid item xs={6}>
         
            <ExpansionPanel elevation={6}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h3>Expansion Panel 1</h3>
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
        </form>
    </Container>
  )
}