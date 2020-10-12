import React, { Fragment } from 'react';
import { MenuItem, Select } from '@material-ui/core';
import { AttributeRow, RowLabel, RowValue } from './AttributeRow';
import { GO_BACK_ACTION, JUMP_TO_PAGE_ACTION, POST_DATA_ACTION } from 'admin/views/Page/PageAction';
import intl from 'react-intl-universal';
import { INode } from 'designer/Core/Node/INode';


export default function AttributeBoxActionSection(props:{node:INode}){
  const {node} = props;
  const [action, setAction] = React.useState(node.meta.props?.onClick||{});

  const handleActionChange = (event: React.ChangeEvent<{ value: unknown }>)=>{
    let newAction =  {...action, name:event.target.value}
    setAction(newAction);
    node.updateProp('onClick', newAction)
  }
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
            <MenuItem value={POST_DATA_ACTION}>{intl.get("sumbit-data")}</MenuItem>
          </Select>
        </RowValue>
      </AttributeRow>  
    </Fragment>
  )
}
