import React, { Fragment, useEffect } from 'react';
import { MenuItem, Select, Switch } from '@material-ui/core';
import { AttributeRow, RowLabel, RowValue } from './AttributeRow';
import { GO_BACK_ACTION, JUMP_TO_PAGE_ACTION, PageAction, POST_DATA_ACTION } from 'admin/views/Page/PageAction';
import intl from 'react-intl-universal';
import { INode } from 'designer/Core/Node/INode';
import {StyledTextInput} from './Inputs/StyledInput';


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

  const handleSlugChange = (event: React.ChangeEvent<{ value: unknown }>) => {
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
  }; 

  return (
    <Fragment>
      <AttributeRow>
        <RowLabel>{intl.get("action")}</RowLabel>
        <RowValue>
          <Select
            value={action.name || ''}
            onChange={handleActionChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={GO_BACK_ACTION}>{intl.get("go-back")}</MenuItem>
            <MenuItem value={JUMP_TO_PAGE_ACTION}>{intl.get("jump-to")}</MenuItem>
          </Select>
        </RowValue>
      </AttributeRow>  
      {
        JUMP_TO_PAGE_ACTION === action.name &&
        <Fragment>
          <AttributeRow>
            <RowLabel nested>{intl.get("module-id")}</RowLabel>
            <RowValue>
              <StyledTextInput value={action.page?.moduleId} onChange={handleModuleIdChange}/>
            </RowValue>
          </AttributeRow>
          <AttributeRow>
            <RowLabel nested>{intl.get("page-id")}</RowLabel>
            <RowValue>
              <StyledTextInput  value={action.page?.pageId} onChange={handlePageIdChange}/>
            </RowValue>
          </AttributeRow>
        </Fragment>
      }
      {
        POST_DATA_ACTION === action.name &&
        <Fragment>
        <AttributeRow>
          <RowLabel nested>{intl.get("action-slug")}</RowLabel>
          <RowValue>
            <StyledTextInput value={action.slug||''} onChange={handleSlugChange}/>
          </RowValue>
        </AttributeRow>
        <AttributeRow>
          <RowLabel nested>{intl.get("finished-go-back")}</RowLabel>
          <RowValue>
          <Switch
            checked={action.needGoBack||false}
            onChange={handleNeedGoBack}
            color="primary"
          />
          </RowValue>
        </AttributeRow>
        </Fragment>

      }
   </Fragment>
  )
}
