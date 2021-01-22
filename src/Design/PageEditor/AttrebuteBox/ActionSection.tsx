import React, { Fragment } from 'react';
import { FormControl,  FormControlLabel,  Grid,  InputLabel, MenuItem, Select, Switch, TextField } from '@material-ui/core';
import { GO_BACK_ACTION, OPEN_PAGE_ACTION, RESET_ACTION, SUBMIT_MUTATION } from "Base/PageUtils/ACTIONs";
import intl from 'react-intl-universal';
import {observer} from 'mobx-react';
import { useDesign } from '../useDesign';
import { cloneObject } from 'Utils/cloneObject';
import { toJS } from 'mobx';
import { IPageMutation } from 'Base/Model/IPageMutation';

const AttributeBoxActionSection = observer(()=>{
  const {editorStore} = useDesign();
  const node = editorStore?.selectedNode;  
  const action = node?.meta.props?.onClick||{};

  const updatAction = (field:string, value:string|IPageMutation|boolean)=>{
    const newAction = cloneObject(action);
    const props = cloneObject(toJS(node?.meta.props)||{})
    newAction[field] = value;
    props.onClick = newAction;
    editorStore?.updateSelecteMeta('props', props);
  }

  const handleActionChange = (event: React.ChangeEvent<{ value: unknown }>)=>{
    const actionName = event.target.value as string;
    updatAction('name', actionName);
  }

  const handleGoBack = (event: React.ChangeEvent<HTMLInputElement>)=>{
    const goback = event.target.checked;
    updatAction('goback', goback);
  }

  const handleModuleSlugChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //let newValue = (event.target.value as string);
    //let newAction:PageAction =  {...action, page:{...action.page, moduleSlug:newValue}};
    //setAction(newAction);
    //node.updateProp('onClick', newAction)
  }; 

  const handlePageSlugChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //let newValue = (event.target.value as string);
    //let newAction:PageAction =  {...action, page:{...action.page, pageSlug:newValue}};
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
            <MenuItem value={RESET_ACTION}>{intl.get("reset")}</MenuItem>
            <MenuItem value={GO_BACK_ACTION}>{intl.get("go-back")}</MenuItem>
            <MenuItem value={OPEN_PAGE_ACTION}>{intl.get("jump-to")}</MenuItem>
          </Select>
        </FormControl>        
      </Grid>  
      {
        OPEN_PAGE_ACTION === action.name &&
        <Fragment>
          <Grid item xs={12}>
            <TextField fullWidth
              variant="outlined" 
              size = "small"
              label={intl.get("module-slug")}
              value={action.page?.moduleSlug} 
              onChange={handleModuleSlugChange}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth
              variant="outlined" 
              size = "small"
              label = {intl.get("page-slug")}
              value = {action.page?.pageSlug} 
              onChange = {handlePageSlugChange}
            ></TextField>
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
                  checked={action.goback||false}
                  onChange={handleGoBack}
                  color="primary"
                  //size="small" 
                />
              }
              style={{margin:'2px'}}
              label={intl.get("finished-go-back")}
            />     
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth
              variant="outlined" 
              size = "small"
              label = {intl.get("action-slug")}
              value={action.slug||''} 
              //onChange={handleSlugChange}
            ></TextField>
          </Grid>
        </Fragment>

      }
   </Fragment>
  )
})

export default AttributeBoxActionSection;