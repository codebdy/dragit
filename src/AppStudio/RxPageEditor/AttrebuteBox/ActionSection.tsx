import React, { Fragment } from 'react';
import { FormControl,  FormControlLabel,  Grid,  InputLabel, MenuItem, Select, Switch, TextField } from '@material-ui/core';
import { GO_BACK_ACTION, OPEN_PAGE_ACTION, RESET_ACTION, SUBMIT_MUTATION } from "Base/PageUtils/ACTIONs";
import intl from 'react-intl-universal';
import {observer} from 'mobx-react';
import { useDesign } from '../../../rx-drag/store/useDesign';
import { cloneObject } from 'rx-drag/utils/cloneObject';
import { toJS } from 'mobx';
import { IPageMutation } from 'Base/Model/IPageMutation';
import { PageAction } from 'Base/PageUtils/PageAction';
import { useAppStudioStore } from 'AppStudio/AppStudioStore';
import { IPageJumper } from 'Base/Model/IPageJumper';

const AttributeBoxActionSection = observer(()=>{
  const {rxDragStore} = useDesign();
  const studioStore = useAppStudioStore();
  const node = rxDragStore?.selectedNode;  
  const action:PageAction = node?.meta.props?.onClick||{};

  const updatAction = (field:string, value:string|IPageMutation|IPageJumper|boolean|Array<string>)=>{
    const newAction = cloneObject(action);
    const props = cloneObject(toJS(node?.meta.props)||{})
    newAction[field] = value;
    props.onClick = newAction;
    rxDragStore?.updateSelecteMeta('props', props);
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
    const openStyle = event.target.value as 'JUMP'|'POPUP'|'DRAWER';
    updatAction('pageJumper', {openStyle});
  } 
  

  const handlePageChange = (event: React.ChangeEvent<{ value: unknown }>)=>{
    const pageId = event.target.value as string;
    updatAction('pageJumper', {pageId});
  } 
  

  return (
    <Fragment>
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
          </Select>
        </FormControl>        
      </Grid>  
      {
        OPEN_PAGE_ACTION === action.name &&
        <Fragment>
          <Grid item xs={12}>
            <FormControl variant="outlined" size="small" fullWidth>
              <InputLabel>{intl.get("open-style")}</InputLabel>
              <Select
                label = {intl.get("open-style")}
                value={action.pageJumper?.openStyle|| ''}
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
                value={action.pageJumper?.pageId || ''}
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
        </Fragment>
      }
      {
        SUBMIT_MUTATION === action.name &&
        <Fragment>
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
              value={action.mutation?.name === undefined ? '' :action.mutation?.name} 
              onChange={(event)=>handleChangeMutation(event, 'name')}
            ></TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth
              variant="outlined" 
              size = "small"
              label = {intl.get("variable-name")}
              value={action.mutation?.variableName === undefined ? '': action.mutation?.variableName} 
              onChange={(event)=>handleChangeMutation(event, 'variableName')}
            ></TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth
              variant="outlined" 
              size = "small"
              label = {intl.get("variable-type")}
              value={action.mutation?.variableType === undefined ? '': action.mutation?.variableType} 
              onChange={(event)=>handleChangeMutation(event, 'variableType')}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth
              variant="outlined" 
              size = "small"
              label = {intl.get("submit-node")}
              value={action.mutation?.submitNode === undefined ? '': action.mutation?.submitNode} 
              onChange={(event)=>handleChangeMutation(event, 'submitNode')}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth
              variant="outlined" 
              size = "small"
              label = {intl.get("refresh-node")}
              value={action.mutation?.refreshNode === undefined ? '': action.mutation?.refreshNode} 
              onChange={(event)=>handleChangeMutation(event, 'refreshNode')}
            ></TextField>
          </Grid>

        </Fragment>
      }
      {
        RESET_ACTION === action.name &&
        <Fragment>
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
        </Fragment>

      }

   </Fragment>
  )
})

export default AttributeBoxActionSection;