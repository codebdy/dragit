import React, { useEffect, useState } from 'react';
import { Container, Grid, createStyles, makeStyles, Theme, TextField, Button } from '@material-ui/core';
import { Fragment } from 'react';
import { Skeleton } from '@material-ui/lab';
import ModulePages from './ModulePages';
import ModuleAuths from './ModuleAuths';
import { IModule } from 'Base/Model/IModule';
import intl from "react-intl-universal";
import { ID } from 'Base/Model/graphqlTypes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    skeltonBottom:{
      height: 'calc(100vh - 150px)',
    },
    title:{
      marginTop:theme.spacing(4),
    }
  }),
);

export default function ModuleContent(
  props:{
    moduleId:ID
  }
){
  const {moduleId} = props;
  const classes = useStyles();
  /*const [loadingConfig, setLoadingConfig] = useState<AxiosRequestConfig>({
    ...API_GET_MODULE_BY_ID,
    params:{
      id:moduleId
    }
  });*/

  //const [module, loading] = useAxios<IModule>(loadingConfig);
  const [slug, setSlug] = useState('');

  useEffect(()=>{
    /*if(loadingConfig.params.id !== moduleId){
      setLoadingConfig(
        {
          ...API_GET_MODULE_BY_ID,
          params:{
            id:moduleId
          }
        }        
      )
    }*/
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleId])

  /*useEffect(()=>{
    if(module){
      setSlug(module.slug);
    }
  },[module])*/

  const handleSave = ()=>{
    /*setLoadingConfig(
      {
        ...API_CHANGE_MODULE,
        params:{
          id:module?.id,
          title:module?.name,
          slug:slug,
        }
      }     
    )*/
  }

  const loading = false;
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
        module && !loading ? 
        <Fragment>
          <Grid container spacing = {4} direction="column">
            <Grid container item md={10} className={classes.title} spacing = {2}>
              <Grid item xs={5}>
                <TextField 
                  fullWidth
                  value = {slug || ''} 
                  size = "small" 
                  variant = "outlined"
                  label = {intl.get('slug')}
                  onKeyUp = {e=>{
                      if(e.keyCode === 13) {
                        //handleFinishEdit()
                      }
                    }
                  }
                  onChange = {e=>setSlug(e.target.value)}         
                />
              </Grid>
              <Grid container item xs={1}>
                <Button variant = "contained" color="primary"
                  onClick = {handleSave}
                >{intl.get('save')}</Button>
              </Grid>
            </Grid>
            <Grid item md={10}> 
              {/*<ModulePages module = {module} />  */}        
            </Grid>
            <Grid item md={10}>
              {/*<ModuleAuths module = {module} />*/}
            </Grid>
          </Grid>
          
        </Fragment>
        :
        <div></div>
      }
    </Container>

  )
}
