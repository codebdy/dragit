import React from 'react';
import {makeStyles, Theme, createStyles, Grid, TextField} from '@material-ui/core';
import intl from 'react-intl-universal';
import MultiSelectBox from 'Components/Inputs/Select/MultiSelectBox';
import {observer} from "mobx-react";
import { useDesign } from '../../../rx-drag/context/useDesign';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      padding:theme.spacing(2),
    },
  }),
);

const SettingsBox = observer(()=>{
  const classes = useStyles();

  const {rxDragCoreStore: editorStore} = useDesign();

  const handleQueryChange = (event: React.ChangeEvent<{ value: unknown }>)=>{
    const newValue = event.target.value as string;
    editorStore?.updatePageQuery(newValue);
  }

  const query = editorStore?.page?.query;

  return (
    <div className = {classes.root}>
      <Grid container spacing = {2}>
        <Grid item xs = {12}>
          <TextField
            fullWidth
            size="small" 
            variant = "outlined" 
            label={intl.get("query")} 
            value={query === undefined ? '' : query }
            onChange={handleQueryChange}>
          </TextField>        
        </Grid>
        <Grid item xs = {12}>
          <MultiSelectBox label={'权限'} 
            variant="outlined" 
            size="small"
            fullWidth
            //dataApi = {API_GET_AUTHS}
            itemKey = "slug"
            groupByField = "module"
            //value = {pageSchema?.auths || []}
            //onChange = {(e:any)=>{onChange({...pageSchema, auths:e.target.value})}}
          />
        </Grid>
      </Grid>
    </div>
    
  )
})

export default SettingsBox;
