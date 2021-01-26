import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import { Button, Grid, TextField } from '@material-ui/core';
import intl from 'react-intl-universal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      padding: theme.spacing(2),
      width:'260px',
    },
    actions:{
      display:'flex',
      justifyContent: 'flex-end',
      alignItems:'center',
    },
    confirmButton:{
      marginLeft:theme.spacing(1),
    }
  }),
);


export const Settings = observer((
  props:{
    onClose?:()=>void
  }
) => {
  const {onClose} = props;
  const classes = useStyles();

  return (
    <div className = {classes.root}>
      <Grid container spacing = {2}>
        <Grid item xs = {12}>
          <TextField 
            fullWidth 
            variant = "outlined" 
            label = {intl.get('name')} 
            size = "small"
          />
        </Grid>
        <Grid item xs = {12}>
          <TextField 
            fullWidth 
            variant = "outlined" 
            label = {intl.get('type')} 
            size = "small"
          />
        </Grid>
        <Grid item xs = {12}>
          <TextField 
            fullWidth 
            variant = "outlined" 
            label = {intl.get('icon')} 
            size = "small"
          />
        </Grid>
        <Grid item xs = {12}>
          <TextField 
            fullWidth 
            variant = "outlined" 
            label = {intl.get('color')} 
            size = "small"
          />
        </Grid>

        <Grid item className = {classes.actions} xs = {12}>
          <Button 
            variant = 'outlined'
            onClick = {onClose}
          >{intl.get('cancel')}</Button>
          <Button className = {classes.confirmButton} variant = 'contained' color = 'primary'>{intl.get('confirm')}</Button>
        </Grid>
      </Grid>
    </div>
  );
})
