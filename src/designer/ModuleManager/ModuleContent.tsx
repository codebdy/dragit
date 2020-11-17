import React, { useEffect } from 'react';
import { Container, Grid, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, createStyles, makeStyles, Theme, LinearProgress} from '@material-ui/core';
import intl from 'react-intl-universal';
import { Fragment } from 'react';
import { useAxios } from 'base/Hooks/useAxios';
import { API_GET_MODULE_BY_ID, API_REMOVE_MODULE_PAGE, API_UPDATE_MODULE_PAGE } from 'APIs/modules';
import { Skeleton } from '@material-ui/lab';
import ModulePageRow, { PageMeta } from './ModulePageRow';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      widht: '100%',
    },
    skeltonBottom:{
      height: 'calc(100vh - 150px)',
    }

  }),
);


export interface ModuleMeta{
  id:number,
  title:string,
  pages?:PageMeta[],
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

  const [operateConfig, setOperateConfig] = React.useState();
  const [module, loading] = useAxios<ModuleMeta>(loadingConfig);
  const [, operateLoading] = useAxios(operateConfig);

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

  const handleChangePage = (page:PageMeta)=>{
    setOperateConfig({
      ...API_UPDATE_MODULE_PAGE,
      data:{
        page:page
      }
    })
  }

  const handleRemove = (pageId:number)=>{
    setOperateConfig({
      ...API_REMOVE_MODULE_PAGE,
      params:{
        id:pageId
      }
    })
      
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
        module && !loading ? 
        <Fragment>
          <Grid container spacing={2} justify="space-between" alignItems="center">
            <Grid item>
              <h2>
                {intl.get('module-management')} : {module.title}
              </h2>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" size="large">
                {intl.get('add-new')}
              </Button>   
            </Grid>
          </Grid>
          {operateLoading && <LinearProgress />}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="modules table">
                  <TableHead>
                    <TableRow>
                      <TableCell><b>{intl.get('title')}</b></TableCell>
                      <TableCell><b>API</b></TableCell>
                      <TableCell style={{width:'80px'}}><b>{intl.get('is-form-page')}</b></TableCell>
                      <TableCell style={{width:'80px'}}><b>{intl.get('is-index-page')}</b></TableCell>
                      <TableCell style={{width:'120px'}}></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      module.pages?.map((page) => (
                        <ModulePageRow 
                          key={page.id} 
                          page={page} 
                          isIndexPage={module.indexPageId === page.id} 
                          onChangePage = {handleChangePage}
                          onRemove = {handleRemove}
                        />
                      ))
                      }
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>        
        </Fragment>
        :
        <div></div>
      }
      
    </Container>

  )
}
