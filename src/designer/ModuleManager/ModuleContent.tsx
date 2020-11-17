import React, { useEffect, useState } from 'react';
import { Container, Grid, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, createStyles, makeStyles, Theme, LinearProgress, IconButton, Tooltip, Checkbox } from '@material-ui/core';
import intl from 'react-intl-universal';
import { Fragment } from 'react';
import { useAxios } from 'base/Hooks/useAxios';
import { API_GET_MODULE_BY_ID } from 'APIs/modules';
import { Skeleton } from '@material-ui/lab';
import MdiIcon from 'components/common/MdiIcon';

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

export interface pageMeta{
  id:number,
  title?:string, 
  API?:string, 
  isFormPage?:boolean
}

export interface ModuleMeta{
  id:number,
  title:string,
  pages?:pageMeta[],
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
  const [module, loading] = useAxios<ModuleMeta>(loadingConfig);
  const [operateLoading, setOperateLoading] = useState(false);
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
                      <TableCell><b>{intl.get('is-form-page')}</b></TableCell>
                      <TableCell><b>{intl.get('is-index-page')}</b></TableCell>
                      <TableCell style={{width:'120px'}}></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      module.pages?.map((page) => (
                        <TableRow key={page.id}>
                          <TableCell>
                          <span>{page.title}</span>
                          </TableCell>
                          <TableCell><span>{page.API}</span></TableCell>
                          <TableCell>
                            <Checkbox
                              checked = {page.isFormPage}
                              color="primary"
                              inputProps={{ 'aria-label': 'Is form page' }}
                            />
                          </TableCell>
                          <TableCell>
                            <Checkbox
                              checked = {module.indexPageId === page.id}
                              color="primary"
                              inputProps={{ 'aria-label': 'Is index page' }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Tooltip title={intl.get('edit')} arrow placement="top">
                              <IconButton aria-label="edit"                                
                              >
                                <MdiIcon iconClass="mdi-pencil" size={16}/>
                              </IconButton>
                            </Tooltip>                            
                            <Tooltip title={intl.get('design-layout')} arrow placement="top">
                              <IconButton aria-label="design"                                
                              >
                                <MdiIcon iconClass="mdi-pencil-ruler" size={16}/>
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={intl.get('delete')} arrow placement="top">
                              <IconButton aria-label="delete"                                
                              >
                                <MdiIcon iconClass="mdi-delete" size={16}/>
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
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
