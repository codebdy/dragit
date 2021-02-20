import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import intl from 'react-intl-universal';
import { Container, Grid, Typography, Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useState } from 'react';
import { EditTemplateDialog } from './EditTemplateDialog';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleArea:{
      padding:theme.spacing(4,0),
    },
    title:{
      fontSize:'1.6rem',
    },
    buttonMargin:{
      marginLeft:theme.spacing(2),
    },

  }),
);


export const TemplateManager = observer(() => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = ()=>{
    setOpen(true);
  }

  const hanldeClose = ()=>{
    setOpen(false);
  }

  return (
    <Container maxWidth = 'lg'>
    <Grid container justify = "space-between" className={classes.titleArea} alignItems="center">
      <Grid item>
        <Typography className={classes.title} variant = "h5">
          {intl.get('templates')}
        </Typography>
      </Grid>
      <Grid>
        <Button 
          className = {classes.buttonMargin}
          variant = "contained" 
          color = "primary" 
          size="large"
          startIcon = {
            <Add />
          }
          onClick = {handleOpen}
        >
          {intl.get('create')}
        </Button>          

      </Grid>
    </Grid>
    <EditTemplateDialog open = {open} onClose = {hanldeClose}/>
  </Container>

  );
})
