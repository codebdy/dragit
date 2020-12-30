import React, { Fragment, useEffect } from 'react';
import { FormControl,  InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { AttributeRow } from './AttributeRow';
import { GO_BACK_ACTION, OPEN_PAGE_ACTION, PageAction, SUBMIT_MUTATION } from 'base/PageAction';
import intl from 'react-intl-universal';
import { IMeta } from 'base/Model/IMeta';
import { RXNode } from 'base/RXNode/RXNode';

export default function AttributeBoxActionSection(
  props:{
    node:RXNode<IMeta>
  }
){
  const {node} = props;
  const [action, setAction] = React.useState(node.meta.props?.onClick||{});

  useEffect(() => {
    setAction(node.meta.props?.onClick||{})
  },[node]);


  const handleActionChange = (event: React.ChangeEvent<{ value: unknown }>)=>{
    let actionName = event.target.value as string;
    let newAction:PageAction =  {...action, name: actionName};

    setAction(newAction);
    //node.updateProp('onClick', newAction)
  }

  const handleModuleSlugChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let newValue = (event.target.value as string);
    let newAction:PageAction =  {...action, page:{...action.page, moduleSlug:newValue}};
    setAction(newAction);
    //node.updateProp('onClick', newAction)
  }; 

  const handlePageSlugChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let newValue = (event.target.value as string);
    let newAction:PageAction =  {...action, page:{...action.page, pageSlug:newValue}};
    setAction(newAction);
    //node.updateProp('onClick', newAction)
  }; 


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
            <MenuItem value={SUBMIT_MUTATION}>{intl.get("sumbit")}</MenuItem>
            <MenuItem value={SUBMIT_MUTATION}>{intl.get("sumbit-and-close")}</MenuItem>
            <MenuItem value={GO_BACK_ACTION}>{intl.get("go-back")}</MenuItem>
            <MenuItem value={OPEN_PAGE_ACTION}>{intl.get("jump-to")}</MenuItem>
          </Select>
        </FormControl>        
      </AttributeRow>  
      {
        OPEN_PAGE_ACTION === action.name &&
        <Fragment>
          <AttributeRow>
            <TextField fullWidth
              variant="outlined" 
              size = "small"
              label={intl.get("module-slug")}
              value={action.page?.moduleSlug} 
              onChange={handleModuleSlugChange}
            ></TextField>
          </AttributeRow>
          <AttributeRow>
            <TextField fullWidth
              variant="outlined" 
              size = "small"
              label = {intl.get("page-slug")}
              value = {action.page?.pageSlug} 
              onChange = {handlePageSlugChange}
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
