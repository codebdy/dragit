import React from "react"
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MdiIcon from 'Components/common/MdiIcon';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import AppCard from './AppCard';
import { Add } from '@material-ui/icons';
import { observer } from 'mobx-react';
import intl from 'react-intl-universal';
//import { useMutation, useQuery } from '@apollo/react-hooks';
//import { CREATE_RX_APP, GET_RX_APP_LIST } from 'Base/GraphQL/APP_GQLs';
//import { useShowAppoloError } from 'Store/Helpers/useInfoError';
import AppsSkeleton from './AppsSkeleton';
import { IRxApp } from 'Base/Model/IRxApp';
import SubmitButton from 'Components/common/SubmitButton';
import { useDragItStore } from 'Store/Helpers/useDragItStore';
import { AUTH_APP } from 'Base/authSlugs';
import { v4 as uuidv4 } from 'uuid';
import { API_CREATE_RX_APP, API_GET_RX_APP_LIST } from "APIs/app";
import { useSWRQuery } from "Data/useSWRQuery";
import useLayzyAxios from "Data/useLayzyAxios";

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

export const AppManager = observer(() => {
  const classes = useStyles();
  const { loading, data:rxApps } = useSWRQuery<IRxApp[]>(API_GET_RX_APP_LIST);
  const dragItStore = useDragItStore();
  const apps = rxApps||[];
  const [ excuteCreate, {loading:saving}] = useLayzyAxios(API_CREATE_RX_APP, {
    //结束后提示
    onCompleted: (data)=>{
      dragItStore.setSuccessAlert(true)
    }
  })

  //useShowAppoloError(error || createError);

  const handleCreate = ()=>{
    excuteCreate({data:{
      rxApp:{
        uuid:uuidv4(),
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
  );
})
