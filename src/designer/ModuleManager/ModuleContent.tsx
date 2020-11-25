import React, { useEffect } from 'react';
import { Container, Grid, createStyles, makeStyles, Theme, FormControlLabel, Switch } from '@material-ui/core';
import { Fragment } from 'react';
import { useAxios } from 'base/Hooks/useAxios';
import { API_GET_MODULE_BY_ID} from 'APIs/modules';
import { Skeleton } from '@material-ui/lab';
import ModulePages from './ModulePages';
import ModuleAuths from './ModuleAuths';
import { IModule } from '../../base/IModule';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    skeltonBottom:{
      height: 'calc(100vh - 150px)',
    },
    entryModuleSwitch:{
      marginTop:theme.spacing(4),
    }
  }),
);

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
  const entryMuodleId = 1;

  const [initModule, loading] = useAxios<IModule>(loadingConfig);

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

  const handleEngtryChange = ()=>{

  }

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
          <Grid container spacing = {4} direction="column">
            <Grid item xs={12} className = {classes.entryModuleSwitch}>
              <FormControlLabel
                control={
                  <Switch
                    checked={entryMuodleId === moduleId}
                    onChange={handleEngtryChange}
                    name="engryModule"
                    color="primary"
                  />
                }
                label="入口模块"
              />
            </Grid>
            <Grid item md={7}> 
              <ModulePages module = {initModule} />          
            </Grid>
            <Grid item md={7}>
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
