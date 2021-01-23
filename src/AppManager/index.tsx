import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MdiIcon from 'Components/Common/MdiIcon';
import { Avatar, Button, Container, Grid, Typography } from '@material-ui/core';
import Spacer from 'Components/Common/Spacer';
import AppCard from './AppCard';
import { Add } from '@material-ui/icons';
import { useState } from 'react';
import { AppMangerStore } from './AppMangerStore';
import { AccountAvatar } from 'AdminBoard/TopNav/AccountAvatar';
import { observer } from 'mobx-react';
import intl from 'react-intl-universal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    logoIcon: {
      marginRight: theme.spacing(2),
      backgroundColor: theme.palette.primary.main,
      letterSpacing:'1px',
      fontWeight:'bold',
      fontSize:'20px',
    },
    titleArea:{
      padding:theme.spacing(2,0),
    },
    title:{
      fontSize:'1.6rem',
    },

    addButton:{
      marginLeft:theme.spacing(2),
    },
    githubLink:{
      color: theme.palette.text.secondary,
      marginRight:theme.spacing(1),
    },
  }),
);

export const AppManager = observer(() => {
  const classes = useStyles();
  const appMangerStore = useState(new AppMangerStore());

  return (
    <div className={classes.root}>
      <AppBar 
        position="static" 
        color = "transparent"
        variant = "outlined"
      >
        <Toolbar>
          <Avatar
            variant="rounded"
            className={classes.logoIcon}
          >
            <MdiIcon iconClass = "mdi-feather" />
          </Avatar>
          <Spacer />
          <a href="https://github.com/rxwater/rxdrag" className={classes.githubLink} target="_blank" rel="noopener noreferrer">
            <MdiIcon iconClass = "mdi-github" />
          </a>
          <AccountAvatar />
        </Toolbar>
      </AppBar>
      <Container maxWidth = 'lg'>
        <Grid container justify = "space-between" className={classes.titleArea} alignItems="center">
          <Grid item>
            <Typography className={classes.title} variant = "h5">
              {intl.get('applications')}
            </Typography>
          </Grid>
          <Grid>
            <Button 
              variant = "contained" 
              size="large"
              startIcon = {
                <MdiIcon iconClass = "mdi-cloud-download-outline" />
              }
            >{intl.get('download')}</Button>
            <Button 
              className = {classes.addButton}
              variant = "contained" 
              color = "primary" 
              size="large"
              startIcon = {
                <Add />
              }
            >{intl.get('create')}</Button>
          </Grid>
        </Grid>
        <Grid container spacing = {2}>
          <Grid item>
            <AppCard />
          </Grid>
          <Grid item>
            <AppCard />
          </Grid>
        </Grid>
        
      </Container>
    </div>
  );
})
