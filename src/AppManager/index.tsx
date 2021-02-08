import React from "react"
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MdiIcon from 'Components/common/MdiIcon';
import { Avatar, Button, Container, Grid, Typography } from '@material-ui/core';
import Spacer from 'Components/common/Spacer';
import AppCard from './AppCard';
import { Add } from '@material-ui/icons';
import { AccountAvatar } from 'AppBoard/TopNav/AccountAvatar';
import { observer } from 'mobx-react';
import intl from 'react-intl-universal';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { CREATE_RX_APP, GET_RX_APP_LIST } from 'Base/GraphQL/APP_GQLs';
import { useShowAppoloError } from 'Store/Helpers/useInfoError';
import AppsSkeleton from './AppsSkeleton';
import { IRxApp } from 'Base/Model/IRxApp';
import SubmitButton from 'Components/common/SubmitButton';
import { useDragItStore } from 'Store/Helpers/useDragItStore';
import { AUTH_APP } from 'Base/authSlugs';

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
      padding:theme.spacing(4,0),
    },
    title:{
      fontSize:'1.6rem',
    },

    buttonMargin:{
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
  const { loading, error, data } = useQuery(GET_RX_APP_LIST);
  const dragItStore = useDragItStore();
  const apps = data ? data.rxApps :[];
  const [ excuteCreate, {loading:saving, error:createError}] = useMutation(CREATE_RX_APP, {
    //更新缓存
    update(cache, { data: { createRxApp } }){
      cache.writeQuery({
        query:GET_RX_APP_LIST,
        data:{
          rxApps:[...apps, createRxApp]
        }
      });
    },
    //结束后提示
    onCompleted: (data)=>{
      dragItStore.setSuccessAlert(true)
    }
  })

  useShowAppoloError(error || createError);

  const handleCreate = ()=>{
    excuteCreate({variables:{
      rxApp:{
        name:intl.get('new-app'),
        icon:'mdi-application',
        app_type:intl.get('free'),
        auths:{
          create:[
          {
            rx_slug:AUTH_APP,
            name:intl.get('app-access'),
            predefined:true,
          }
        ]},
        pages:{
          create:[
            {
              name:'home',
              schema: JSON.stringify([
                {
                  name:'GridRow'
                }
              ])
            }
          ]
        }
      }
    }})
  }

  const handleDownload = ()=>{
    dragItStore.infoError('功能尚未开放，敬请期待...')
  }

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
          <Button
            variant = "text"
            size = "large"
            color = "primary"
            onClick={() => {
              console.info("I'm a button.");
            }}
          >
            {intl.get('applications')}
          </Button>
          <Button
            variant = "text"
            size = "large"
            onClick={() => {
              console.info("I'm a button.");
            }}
          >
            {intl.get('template')}
          </Button>
          <Button
            variant = "text"
            size = "large"
            onClick={() => {
              window.open("https://document.rxdrag.com");  
            }}
          >
            {intl.get('document')}
          </Button>
          <Button
            variant = "text"
            size = "large"
            onClick={() => {
              window.open("https://github.com/rxwater/dragit/issues");  
            }}
          >
            {intl.get('report-bug')}
          </Button>

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
                <MdiIcon iconClass = "mdi-cloud-upload-outline" />
              }
              onClick = {handleDownload}
            >{intl.get('upload')}</Button>  
            
            <SubmitButton 
              className = {classes.buttonMargin}
              variant = "contained" 
              color = "primary" 
              size="large"
              submitting = {saving}
              startIcon = {
                <Add />
              }
              onClick = {handleCreate}
            >
              {intl.get('create')}
            </SubmitButton>          
            <Button 
              variant = "contained" 
              size="large"
              color = "secondary"
              className = {classes.buttonMargin}
              startIcon = {
                <MdiIcon iconClass = "mdi-shopping-outline" />
              }
              onClick = {handleDownload}
            >{intl.get('app-store')}
            </Button>

          </Grid>
        </Grid>
        {
          loading
          ? <AppsSkeleton />
          : <Grid container spacing = {2}>
              {
                apps.map((rxApp:IRxApp)=>{
                  return(
                    <Grid item key={rxApp.id} lg={2} md={3} sm={4} xs={6}>
                      <AppCard apps = {apps} rxApp = {rxApp} />
                    </Grid>
                  )
                })
              }
            </Grid>
        }
      </Container>
    </div>
  );
})
