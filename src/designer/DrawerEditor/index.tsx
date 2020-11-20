import React from 'react';
import { makeStyles, Theme, createStyles, AppBar, Button, IconButton, Toolbar, Typography, Container, TextField, Grid } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useHistory } from 'react-router';
import intl from "react-intl-universal";
import DrawerItemList from './DrawerItemList';
import ToolsAccordion from './ToolsAccordion';
import { API_GET_DRAWER } from 'APIs/drawer';
import { useAxios } from 'base/Hooks/useAxios';
import MenuItemMeta from 'base/MenuItemMeta';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width:'100%',
      height:'100%',
      display:'flex',
      flexFlow:'column',
      background: theme.palette.background.default,
    },
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
      color: theme.palette.text.primary,
    },
    saveButton:{
      color: theme.palette.text.primary,
    },
    content:{
      //flex:1,
      height:'100%',
      display:'flex',

      padding:theme.spacing(2),
    },
    left:{
      flex:'1',
      paddingRight:theme.spacing(3),
    },
    center:{
      width:'360px',
      border:'solid 2px rgba(0,0,0, 0.3)',
      backgroundColor: theme.palette.background.paper,
      display:'flex',
      flexFlow:'column',    
    },
    right:{
      flex:'1',
      paddingLeft:theme.spacing(5),
    }
  }),
);

export default function DrawerEditor(){
  const classes = useStyles();
  const history = useHistory();
  const [items] = useAxios<Array<MenuItemMeta>>(API_GET_DRAWER);

  const handleClose = ()=>{
    history.goBack();
  }

  const handleSave = ()=>{

  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} color="inherit">
        <Toolbar>
          <IconButton edge="start" onClick={handleClose} aria-label="close">
            <Close fontSize="large"/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {intl.get('edit-drawer')}
          </Typography>
          <Button className={classes.saveButton} onClick={handleSave} size="large"style={{fontSize:'1.2rem'}}>
            {intl.get('save')}
          </Button>
        </Toolbar>
      </AppBar>
      <Container className={classes.content}>
        <Grid container className = {classes.left} spacing = {2}>
          <Grid item xs={6}>
            <TextField variant="outlined" label = "名称" size="small"/>
          </Grid>
          <Grid item xs={6}>
            <TextField variant="outlined" label = "名称" size="small"/>
          </Grid>
        </Grid>
        <div className = {classes.center}>
          <DrawerItemList items={items} />
        </div>
        <div className = {classes.right}>
          <ToolsAccordion />
        </div>
      </Container>
    </div>
  )
}
