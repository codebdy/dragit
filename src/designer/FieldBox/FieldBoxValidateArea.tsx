import React, { Fragment } from 'react';
import {MenuItem, Select } from '@material-ui/core';
import { AttributeRow, RowLabel, RowValue } from 'designer/Attrebutebox/AttributeRow';
import intl from 'react-intl-universal';

export default function FieldBoxValidateArea(){

  return (
    <Fragment>
      <AttributeRow>
        <RowLabel>{intl.get("validate-type")}</RowLabel>
        <RowValue>
          <Select
            value={''}
            //onChange={handleActionChange}
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
