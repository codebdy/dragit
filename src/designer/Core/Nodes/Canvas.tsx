import React from 'react';
import { makeStyles, Theme, createStyles, Container, Grid, Card } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    canvas:{
      flex:1,
      display:'flex',
      flexFlow: 'column',
      padding: theme.spacing(1),
    },

    outline:{
      outline:"#5d78ff dashed 1px",
      padding:theme.spacing(2),
    }

  }),
);


export default function Canvas(){
  const classes = useStyles();

  return (
    <div className={classes.canvas}>
      <Container className = {classes.outline} style={{flex:1,}}>
        <Grid container className = {classes.outline} >
        <Grid item className = {classes.outline} xs={6}>
            <Card>ddd</Card> 
          </Grid>
          <Grid item className = {classes.outline} xs={6}> 
            
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}