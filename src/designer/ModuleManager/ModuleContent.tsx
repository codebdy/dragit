import React, { useEffect } from 'react';
import { Container, Grid, createStyles, makeStyles, Theme } from '@material-ui/core';
import { Fragment } from 'react';
import { useAxios } from 'base/Hooks/useAxios';
import { API_GET_MODULE_BY_ID} from 'APIs/modules';
import { Skeleton } from '@material-ui/lab';
import { IPage } from 'base/IPage';
import ModulePages from './ModulePages';
import ModuleAuths from './ModuleAuths';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    skeltonBottom:{
      height: 'calc(100vh - 150px)',
    },
  }),
);

export interface ModuleMeta{
  id:number,
  title:string,
  pages?:IPage[],
  indexPageId?:number,
}

export default function ModuleContent(
  props:{
    moduleId:number
  }
){
  const {moduleId} = props;
  const classes = useStyles();
  const [loadingConfig, setLoadingConfig] = React.useState({
    ...API_GET_MODULE_BY_ID,
    params:{
      id:moduleId
    }
  });

  const [initModule, loading] = useAxios<ModuleMeta>(loadingConfig);

  useEffect(()=>{
    if(loadingConfig.params.id !== moduleId){
      setLoadingConfig(
        {
          ...API_GET_MODULE_BY_ID,
          params:{
            id:moduleId
          }
        }        
      )
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleId])

  return (
    <Container>
      {
        loading && 
        <Fragment>
          <Skeleton animation="wave" height={50} width="30%" style={{ marginTop: 6 }} />
          <Skeleton animation="wave" variant="rect" className={classes.skeltonBottom} />
        </Fragment>
      }
      {
        initModule && !loading ? 
        <Fragment>
          <Grid container spacing = {4}>
            <Grid item md={6}> 
              <ModulePages module = {initModule} />          
            </Grid>
            <Grid item md={6}>
              <ModuleAuths module = {initModule} />
            </Grid>
          </Grid>
          
        </Fragment>
        :
        <div></div>
      }
    </Container>

  )
}
