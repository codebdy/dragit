import React, { Fragment, useEffect } from 'react';
import { FormControl,  InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { AttributeRow } from './AttributeRow';
import { GO_BACK_ACTION, JUMP_TO_PAGE_ACTION, PageAction } from 'admin/views/Page/PageAction';
import intl from 'react-intl-universal';
import { INode } from 'designer/Core/Node/INode';

export default function AttributeBoxActionSection(props:{node:INode}){
  const {node} = props;
  const [action, setAction] = React.useState(node.meta.props?.onClick||{});

  useEffect(() => {
    setAction(node.meta.props?.onClick||{})
  },[node]);


  const handleActionChange = (event: React.ChangeEvent<{ value: unknown }>)=>{
    let actionName = event.target.value as string;
    let newAction:PageAction =  {...action, name: actionName};

    setAction(newAction);
    node.updateProp('onClick', newAction)
  }

  const handleModuleIdChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let newValue = (event.target.value as string);
    let newAction:PageAction =  {...action, page:{...action.page, moduleId:newValue}};
    setAction(newAction);
    node.updateProp('onClick', newAction)
  }; 

  const handlePageIdChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let newValue = (event.target.value as string);
    let newAction:PageAction =  {...action, page:{...action.page, pageId:newValue}};
    setAction(newAction);
    node.updateProp('onClick', newAction)
  }; 

  /*const handleSlugChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let newValue = (event.target.value as string);
    let newAction:PageAction =  {...action, slug:newValue};
    setAction(newAction);
    node.updateProp('onClick', newAction)
  }; 

  const handleNeedGoBack = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue =  event.target.checked;
    let newAction:PageAction =  {...action, needGoBack:newValue};
    setAction(newAction);
    node.updateProp('onClick', newAction)
  }; */

  return (
    <Fragment>
      <AttributeRow>
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
            <MenuItem value={GO_BACK_ACTION}>{intl.get("go-back")}</MenuItem>
            <MenuItem value={JUMP_TO_PAGE_ACTION}>{intl.get("jump-to")}</MenuItem>
          </Select>
        </FormControl>        
      </AttributeRow>  
      {
        JUMP_TO_PAGE_ACTION === action.name &&
        <Fragment>
          <AttributeRow>
            <TextField fullWidth
              variant="outlined" 
              size = "small"
              label={intl.get("module-id")}
              value={action.page?.moduleId} 
              onChange={handleModuleIdChange}
            ></TextField>
          </AttributeRow>
          <AttributeRow>
            <TextField fullWidth
              variant="outlined" 
              size = "small"
              label = {intl.get("page-id")}
              value = {action.page?.pageId} 
              onChange = {handlePageIdChange}
            ></TextField>
          </AttributeRow>
        </Fragment>
      }
      {
        /*POST_DATA_ACTION === action.name &&
        <Fragment>
        <AttributeRow>
          <TextField fullWidth
            variant="outlined" 
            size = "small"
            label = {intl.get("action-slug")}
            value={action.slug||''} 
            onChange={handleSlugChange}
          ></TextField>
        </AttributeRow>
        <AttributeRow>
          <FormControlLabel
            control={
              <Switch
                checked={action.needGoBack||false}
                onChange={handleNeedGoBack}
                color="primary"
                //size="small" 
              />
            }
            style={{margin:'2px'}}
            label={intl.get("finished-go-back")}
          />     
        </AttributeRow>
        </Fragment>*/

      }
   </Fragment>
  )
}
