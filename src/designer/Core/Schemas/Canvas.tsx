import React from 'react';
import { makeStyles, Theme, createStyles, Container, Grid, Card } from "@material-ui/core";
import classNames from 'classnames';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    canvas:{
      flex:1,
      display:'flex',
      flexFlow: 'column',
    },

    editPadding:{
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
      <Container 
        className = {classNames(classes.outline, classes.editPadding)} 
        style={{flex:1,}}
      >
        <Grid container className = {classes.outline} >
        <Grid item className = {classes.outline} xs={6}>
            <Card elevation={6}>ddd</Card> 
          </Grid>
          <Grid item className = {classes.outline} xs={6}> 
            
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}