import React, { Fragment } from 'react';
import { FormControl,  Grid,  InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { AttributeRow } from './AttributeRow';
import { PageAction } from 'Base/PageUtils/PageAction';
import { GO_BACK_ACTION, OPEN_PAGE_ACTION, SUBMIT_MUTATION, SUBMIT_MUTATION_AND_CLOSE } from "Base/PageUtils/ACTIONs";
import intl from 'react-intl-universal';
import {observer} from 'mobx-react';
import { useDesign } from '../useDesign';
import { cloneObject } from 'Utils/cloneObject';
import { toJS } from 'mobx';

const AttributeBoxActionSection = observer(()=>{
  const {editorStore} = useDesign();
  const node = editorStore?.selectedNode;  
  const action = node?.meta.props?.onClick||{};

  const updatAction = (action:PageAction)=>{
    const props = cloneObject(toJS(node?.meta.props)||{})
    props.onClick = action;
    editorStore?.updateSelecteMeta('props', props);
  }

  const handleActionChange = (event: React.ChangeEvent<{ value: unknown }>)=>{
    const actionName = event.target.value as string;
    const newAction =  {...action, name: actionName};
    updatAction(newAction);
  }

  const handleModuleSlugChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let newValue = (event.target.value as string);
    let newAction:PageAction =  {...action, page:{...action.page, moduleSlug:newValue}};
    //setAction(newAction);
    //node.updateProp('onClick', newAction)
  }; 

  const handlePageSlugChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let newValue = (event.target.value as string);
    let newAction:PageAction =  {...action, page:{...action.page, pageSlug:newValue}};
    //setAction(newAction);
    //node.updateProp('onClick', newAction)
  }; 


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
            <MenuItem value={SUBMIT_MUTATION_AND_CLOSE}>{intl.get("sumbit-and-close")}</MenuItem>
            <MenuItem value={GO_BACK_ACTION}>{intl.get("go-back")}</MenuItem>
            <MenuItem value={OPEN_PAGE_ACTION}>{intl.get("jump-to")}</MenuItem>
          </Select>
        </FormControl>        
      </Grid>  
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
})

export default AttributeBoxActionSection;