import React, { Fragment } from "react";
import { createStyles, Fab, Grid, LinearProgress, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme } from "@material-ui/core";
import PrimaryText from "base/PropsInputs/PrimaryText";
import { IModule } from "base/Model/IModule";
import intl from "react-intl-universal";
import { Add } from "@material-ui/icons";
import ModuleAuthsRow from "./ModuleAuthsRow";
import { IAuth } from "base/Model/IAuth";
import { useAxios } from "base/Hooks/useAxios";
import { API_ADD_MODULE_AUTH, API_REMOVE_MODULE_AUTH, API_UPDATE_MODULE_AUTH } from "APIs/modules";
import createId from "utils/createId";
import { ID } from "base/Model/graphqlTypes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      widht: '100%',
    },
    addArea:{
      width:'100%',
      position:'relative',
    },
    fab:{
      position:'absolute',
      right:'120px',
      top:theme.spacing(-3),
    }

  }),
);


export default function ModuleAuths(props:{module:IModule}){
  //const {module} = props;
  const classes = useStyles();

  const [operateConfig, setOperateConfig] = React.useState<any>();
  const [operateModule, operateLoading] = useAxios<IModule>(operateConfig);
  
  const module = operateModule || props.module;

  const handleAdd = ()=>{
    setOperateConfig({
      ...API_ADD_MODULE_AUTH,
      params:{
        moduleId:module.id,
        name:'New Auth',
        slug:'auth-slug' + createId(),
      }
    })    

  }

  const handleChange = (auth:IAuth)=>{
    setOperateConfig({
      ...API_UPDATE_MODULE_AUTH,
      params:{
        moduleId:module.id
      },
      data:{
        auth:auth
      }
    })
  }

  const handleRemove = (authId:ID)=>{
    setOperateConfig({
      ...API_REMOVE_MODULE_AUTH,
      params:{
        moduleId:module.id,
        authId:authId
      }
    })
  }

  return (
    <Fragment>
      <Grid container spacing={2} justify="space-between" alignItems="center">
        <Grid item xs={12}>
          <h2>
            <PrimaryText>
              {intl.get('module-auth')}
            </PrimaryText>
          </h2>
        </Grid>
        <Grid item xs={12}>
          {operateLoading && <LinearProgress />}
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="modules table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell><b>{intl.get('slug')}</b></TableCell>
                  <TableCell><b>{intl.get('name')}</b></TableCell>
                  <TableCell style={{width:'100px'}}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  module?.auths?.map((auth:IAuth)=>{
                    return (
                      <ModuleAuthsRow 
                        key = {auth.id} 
                        auth = {auth} 
                        onChange = {handleChange}
                        onRemove = {handleRemove}
                      />
                    )
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
          <div className = {classes.addArea}>
            <Fab color="primary" 
              className={classes.fab} 
              size="medium"
              onClick = {handleAdd}
            >
              <Add />
            </Fab>  
          </div> 
        </Grid>
      </Grid>
    </Fragment>
  )
}