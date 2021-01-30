import React from 'react';
import {makeStyles, Theme, createStyles, Grid, TextField, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
import intl from 'react-intl-universal';
import {MultiSelectBox} from 'Components/Inputs/Select/MultiSelectBox';
import {observer} from "mobx-react";
import { useDesign } from '../../../rx-drag/store/useDesign';
import { useAppStudioStore } from 'AppStudio/AppStudioStore';
import { stringValue } from 'rx-drag/utils/stringValue';
import { PagePropName, PagePropValue, UpdatePageCommand } from './UpdatePageCommand';
import StringInput from '../AttrebuteBox/PropsInputs/StringInput';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      padding:theme.spacing(2),
    },
  }),
);

const SettingsBox = observer(()=>{
  const classes = useStyles();
  const studioStore = useAppStudioStore();
  const {rxDragStore} = useDesign();
  const page = studioStore?.pageEditor?.currentData;
  
  const doUpdatePage = (key:PagePropName, value:PagePropValue)=>{
    if(studioStore?.pageEditor && rxDragStore){
      const cmd = new UpdatePageCommand(rxDragStore, studioStore?.pageEditor, key, value);
      rxDragStore.excuteCommand(cmd);
    }
  }

  const handleWidthChange =  (event: React.ChangeEvent<{ value: unknown }>)=>{
    const newWidth = parseInt(event.target.value as string);
    doUpdatePage('width', newWidth);
  }

  const handleQueryChange = (value: any)=>{
    doUpdatePage('query', value);
  }

  const handleChangeMaxWidth = (event: React.ChangeEvent<{ value: unknown }>)=>{
    const newMaxWidth = event.target.value as string;
    doUpdatePage('max_width', newMaxWidth);
  }

  const handleChangeAuths = (event: React.ChangeEvent<{ value: unknown }>)=>{
    const newAuths = event.target.value as any
    doUpdatePage('auths', newAuths);
  }

  return (
    <div className = {classes.root}>
      <Grid container spacing = {2}>
        <Grid item xs = {12}>
          <FormControl variant="outlined" size="small" fullWidth >
            <InputLabel>{intl.get('max-width')}</InputLabel>
            <Select
              value={ stringValue(page?.max_width) }
              onChange={handleChangeMaxWidth}
              label = {intl.get('max-width')}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'xl'}>
                xl
              </MenuItem>              
              <MenuItem value={'lg'}>
                lg
              </MenuItem>
              <MenuItem value={'md'}>
                md
              </MenuItem>
              <MenuItem value={'sm'}>
                sm
              </MenuItem>
              <MenuItem value={'xs'}>
                xs
              </MenuItem>
              <MenuItem value={'false'}>
                false
              </MenuItem>
            </Select>
          </FormControl>      
        </Grid>
        <Grid item xs = {12}>
          <TextField
            type = 'number'
            fullWidth
            size="small" 
            variant = "outlined" 
            label={intl.get("width")} 
            value={page?.width === undefined || page?.width === null ? '' : page?.width}
            onChange={handleWidthChange}
          >
          </TextField>        
        </Grid>
        <StringInput
          xs = {12} 
          label={intl.get("query")} 
          value={stringValue(page?.query)}
          onChange={handleQueryChange}
        />
        <Grid item xs = {12}>
          <MultiSelectBox fullWidth label={intl.get('authority')} 
            variant="outlined" 
            size="small"
            items = {studioStore?.rxApp?.auths || []}
            value = {page?.auths || []}
            onChange = {handleChangeAuths}
          />
        </Grid>
      </Grid>
    </div>
  )
})

export default SettingsBox;
