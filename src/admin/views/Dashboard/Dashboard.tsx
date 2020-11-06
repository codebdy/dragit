import React from "react";
import { Grid, Paper, makeStyles, Theme, createStyles, Container, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, Card, Input, FormControl, InputLabel, InputAdornment, CardHeader, CardActions, CardContent, MenuItem, Select } from "@material-ui/core";
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
      
     
        
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper} elevation={6}>
            <FormikExample />  
            <div>
                
                <div className={classes.margin}>
                  
                </div>
              </div>
              
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <AccountCircle />
                </Grid>
                <Grid item>
                  <TextField id="input-with-icon-grid" variant="outlined" label="With a grid" />
                </Grid>
              </Grid>
              <FormControl variant="outlined" size="small">
                <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  //value={age}
                  //onChange={handleChange}
                  label="Age"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>

              <TextField
                  
                  id="input-with-icon-textfield"
                  variant="outlined"
                  label="TextField"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
              />
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
                <h2>基本信息</h2>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                  sit amet blandit leo lobortis eget.
                </Typography>
              </ExpansionPanelDetails>
              <CardActions>Action</CardActions>
            </ExpansionPanel>
          </Grid>
          <Grid item xs={6}>
            <Card elevation={6}>
              <CardHeader title="基本信息"></CardHeader>
              <div style={{/*height:'0px', overflow:'hidden',*/}}>
              <CardContent>Content</CardContent>
              <CardActions>Action</CardActions>
              </div>
            </Card>
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