import React, { Fragment } from 'react';
import {MenuItem, Select } from '@material-ui/core';
import { AttributeRow, RowLabel, RowValue } from 'designer/Attrebutebox/AttributeRow';
import intl from 'react-intl-universal';

export interface ValidateRule{
  valueType:string;
}

export default function FieldBoxValidateArea(props:{rule?:ValidateRule, onChange:(rule:ValidateRule)=>void}){
  const {rule, onChange} = props;
  const handleTypeChange = (event: React.ChangeEvent<{ value: unknown }>)=>{
    let valueType = event.target.value as string;
    onChange({...rule, valueType:valueType});
  };

  return (
    <Fragment>
      <AttributeRow>
        <RowLabel>{intl.get("validate-type")}</RowLabel>
        <RowValue>
          <Select
            value={rule?.valueType || ''}
            onChange={handleTypeChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value='string'>String</MenuItem>
            <MenuItem value='number'>Number</MenuItem>
            <MenuItem value='boolean'>Boolean</MenuItem>
            <MenuItem value='date'>Date</MenuItem>
          </Select>
        </RowValue>
      </AttributeRow>          
    </Fragment>
  )
}
