import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import intl from 'react-intl-universal';
import { Container, Grid, Typography, Button, TextField, DialogActions } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useState } from 'react';
import PageDialog from 'Base/Widgets/PageDialog';
import { MediaSelect } from 'Components/Inputs/MediaSelect/MediaSelect';


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
    dialogContent:{
      width:'100%',
      padding:theme.spacing(2),
    }
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
    <PageDialog title={intl.get('edit-template')} open = {open} onClose = {hanldeClose}>
      <div className = {classes.dialogContent}>
        <Grid container spacing = {2}>
            <Grid item xs={6}>
              <TextField fullWidth variant="outlined" label = {intl.get('name')}/>
            </Grid>
            <Grid item xs={12}>
              <MediaSelect 
                label = {intl.get('thumbnail')}
                width = "200px"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                variant="outlined" 
                label = "Schema"
                multiline
                rows = {20}
              />
            </Grid>
        </Grid>
      </div>
      <DialogActions>
        <Button onClick = {hanldeClose}>
          {intl.get('cancel')}
        </Button>
        <Button color = "primary" variant = "contained">
          {intl.get('save')}
        </Button>
      </DialogActions>
    </PageDialog>

  </Container>

  );
})
