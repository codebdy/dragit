import React from 'react';
import { FormControl,  FormControlLabel,  Grid,  InputLabel, MenuItem, Select, Switch, TextField } from '@material-ui/core';
import { BATCH_REMOVE_LIST_VIEW_RECORDS, BATCH_UPDATE_LIST_VIEW_RECORDS, GO_BACK_ACTION, OPEN_PAGE_ACTION, REMOVE_LIST_VIEW_RECORD, RESET_ACTION, SUBMIT_MUTATION, UPDATE_LIST_VIEW_RECORD } from "Base/PageUtils/ACTIONs";
import intl from 'react-intl-universal';
import {observer} from 'mobx-react';
import { cloneObject } from 'rx-drag/utils/cloneObject';
import { IPageMutation } from 'Base/Model/IPageMutation';
import { IPageAction } from 'Base/Model/IPageAction';
import { useAppStudioStore } from 'AppStudio/AppStudioStore';
import { IPageJumper } from 'Base/Model/IPageJumper';
import { stringValue } from 'rx-drag/utils/stringValue';
import { toJS } from 'mobx';

const AttributeBoxActionSection = observer((
  props:{
    action?:IPageAction,
    onChange?:(action?:IPageAction)=>void,
  }
)=>{
  const {action = {} as IPageAction, onChange} = props;
  const studioStore = useAppStudioStore();
  
  const updatAction = (field:string, value:string|IPageMutation|IPageJumper|boolean|Array<string>)=>{
    const newAction = cloneObject(toJS(action));
    newAction[field] = value;
    onChange && onChange(newAction);
  }

  const handleActionChange = (event: React.ChangeEvent<{ value: unknown }>)=>{
    const actionName = event.target.value as string;
    updatAction('name', actionName);
  }

  const handleGoBack = (event: React.ChangeEvent<HTMLInputElement>)=>{
    const goback = event.target.checked;
    const mutation:IPageMutation = cloneObject(action.mutation) ||{};
    mutation.goback = goback;
    updatAction('mutation', mutation);
  }

  const handleResetNodesChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (event.target.value as string) || '';
    updatAction('resetNodes', newValue.replace('，',',').split(','));
  }; 

  const handleChangeMutation =  (event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>, 
    key:'name'|'variableName'|'variableType'|'submitNode'|'refreshNode') => {
    const newValue = (event.target.value as string) || '';
    const mutation:IPageMutation = cloneObject(action.mutation) ||{};
    mutation[key] = newValue;
    updatAction('mutation', mutation);
  }; 

  const handleOpenStyleChange = (event: React.ChangeEvent<{ value: unknown }>)=>{
    const openStyle = event.target.value as 'JUMP'|'POPUP'|'DRAWER'|'';
    updatAction('pageJumper', {...action?.pageJumper, openStyle});
  } 
  

  const handlePageChange = (event: React.ChangeEvent<{ value: unknown }>)=>{
    const pageId = parseInt(event.target.value as string);
    updatAction('pageJumper', {...action?.pageJumper, pageId});
  } 
  

  return (
    <>
      <Grid item xs={12}>
        <FormControl variant="outlined" size="small" fullWidth>
          <InputLabel>{intl.get("action")}</InputLabel>
          <Select
            label = {intl.get("action")}
            value={action.name || ''}
            onChange={handleActionChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={SUBMIT_MUTATION}>{intl.get("sumbit")}</MenuItem>
            <MenuItem value={RESET_ACTION}>{intl.get("reset")}</MenuItem>
            <MenuItem value={GO_BACK_ACTION}>{intl.get("go-back")}</MenuItem>
            <MenuItem value={OPEN_PAGE_ACTION}>{intl.get("open-page")}</MenuItem>

            <MenuItem value={REMOVE_LIST_VIEW_RECORD}>{intl.get("remove-table-record")}</MenuItem>
            <MenuItem value={UPDATE_LIST_VIEW_RECORD}>{intl.get("update-table-record")}</MenuItem>
            <MenuItem value={BATCH_REMOVE_LIST_VIEW_RECORDS}>{intl.get("batch-remove-table-record")}</MenuItem>
            <MenuItem value={BATCH_UPDATE_LIST_VIEW_RECORDS}>{intl.get("batch-update-table-record")}</MenuItem>
          </Select>
        </FormControl>        
      </Grid>  
      {
        OPEN_PAGE_ACTION === action.name &&
        <>
          <Grid item xs={12}>
            <FormControl variant="outlined" size="small" fullWidth>
              <InputLabel>{intl.get("open-style")}</InputLabel>
              <Select
                label = {intl.get("open-style")}
                value={stringValue(action.pageJumper?.openStyle)}
                onChange={handleOpenStyleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={'JUMP'}>{intl.get("jump-style")}</MenuItem>
                <MenuItem value={'POPUP'}>{intl.get("popup-style")}</MenuItem>
                <MenuItem value={'DRAWER'}>{intl.get("drawer-style")}</MenuItem>
              </Select>
            </FormControl>        

          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" size="small" fullWidth>
              <InputLabel>{intl.get("page")}</InputLabel>
              <Select
                label = {intl.get("page")}
                value={action.pageJumper?.pageId?.toString()||''}
                onChange={handlePageChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {
                  studioStore?.rxApp?.pages?.map(page=>{
                    return(
                      <MenuItem key = {page.id} value={page.id}>{page.name}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>  
          </Grid>
        </>
      }
      {
        (UPDATE_LIST_VIEW_RECORD === action.name || BATCH_UPDATE_LIST_VIEW_RECORDS === action.name)&&
        <>
          <Grid item xs={12}>
            <TextField fullWidth
              variant="outlined" 
              size = "small"
              label = {intl.get("field")}
              value={stringValue(action.field)} 
              onChange={(event)=>updatAction('field', event.target.value)}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth
              variant="outlined" 
              size = "small"
              label = {intl.get("value")}
              value={stringValue(action.value)} 
              onChange={(event)=>updatAction('value', event.target.value)}
            ></TextField>
          </Grid>
        </>
      }
      {
        SUBMIT_MUTATION === action.name &&
        <>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={action.mutation?.goback||false}
                  onChange={handleGoBack}
                  color="primary"
                />
              }
              label={intl.get("finished-go-back")}
            />     
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth
              variant="outlined" 
              size = "small"
              label = {intl.get("mutaion-name")}
              value={stringValue(action.mutation?.name)} 
              onChange={(event)=>handleChangeMutation(event, 'name')}
            ></TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth
              variant="outlined" 
              size = "small"
              label = {intl.get("variable-name")}
              value={stringValue(action.mutation?.variableName)} 
              onChange={(event)=>handleChangeMutation(event, 'variableName')}
            ></TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth
              variant="outlined" 
              size = "small"
              label = {intl.get("variable-type")}
              value={stringValue(action.mutation?.variableType)} 
              onChange={(event)=>handleChangeMutation(event, 'variableType')}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth
              variant="outlined" 
              size = "small"
              label = {intl.get("submit-node")}
              value={stringValue(action.mutation?.submitNode)} 
              onChange={(event)=>handleChangeMutation(event, 'submitNode')}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth
              variant="outlined" 
              size = "small"
              label = {intl.get("refresh-node")}
              value={stringValue(action.mutation?.refreshNode)} 
              onChange={(event)=>handleChangeMutation(event, 'refreshNode')}
            ></TextField>
          </Grid>

        </>
      }
      {
        RESET_ACTION === action.name &&
        <>
          <Grid item xs={12}>
            <TextField fullWidth
              variant="outlined" 
              size = "small"
              label = {intl.get("reset-nodes")}
              value={action.resetNodes?.join(',')||''} 
              onChange={handleResetNodesChange}
              helperText = {intl.get("split-by-comma")}
            ></TextField>
          </Grid>
        </>

      }
      <Grid item xs={12}>
        <TextField fullWidth
          variant="outlined" 
          multiline
          rows ={3}
          size = "small"
          label = {intl.get("confirm-message")}
          value={stringValue(action.confirmMessage)} 
          onChange={(event)=>updatAction('confirmMessage', event.target.value as string)}
        ></TextField>
      </Grid>
   </>
  )
})

export default AttributeBoxActionSection;