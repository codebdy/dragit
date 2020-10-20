import React, { Fragment } from 'react';
import {MenuItem, Select, Switch } from '@material-ui/core';
import { AttributeRow, RowLabel, RowValue } from 'designer/Attrebutebox/AttributeRow';
import intl from 'react-intl-universal';
import StyledTextInput from 'designer/Attrebutebox/Inputs/StyledTextInput';

export interface ValidateRule{
  valueType:string;
  [key:string]:any;
}

export default function FieldBoxValidateArea(props:{rule?:ValidateRule, onChange:(rule:ValidateRule)=>void}){
  const {rule, onChange} = props;
  const handleTypeChange = (event: React.ChangeEvent<{ value: unknown }>)=>{
    let valueType = event.target.value as string;
    onChange({...rule, valueType:valueType});
  };

  const handleRuleChange = (item:string, value:string|boolean)=>{
    let newRule:any = {...rule};
    newRule[item] = value;
    onChange(newRule);
  }

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
      {
        rule?.valueType === 'string' &&
        <Fragment>
          <AttributeRow>
            <RowLabel nested>{intl.get("required")}</RowLabel>
            <RowValue>
            <Switch
              checked={rule.required||false}
              onChange={ (e)=>{handleRuleChange('required', e.target.checked)} }
              color="primary"
            />
            </RowValue>
          </AttributeRow>
          <AttributeRow>
            <RowLabel nested>{intl.get("email")}</RowLabel>
            <RowValue>
            <Switch
              checked={rule.email||false}
              onChange={ (e)=>{handleRuleChange('email', e.target.checked)} }
              color="primary"
            />
            </RowValue>
          </AttributeRow>
          <AttributeRow>
            <RowLabel nested>{intl.get("url")}</RowLabel>
            <RowValue>
            <Switch
              checked={rule.url||false}
              onChange={ (e)=>{handleRuleChange('url', e.target.checked)} }
              color="primary"
            />
            </RowValue>
          </AttributeRow>
          <AttributeRow>
            <RowLabel nested>{intl.get("length")}</RowLabel>
            <RowValue>
              <StyledTextInput type="number" value={rule.length||''} onChange={(e:any)=>{handleRuleChange('length', e.target.value)}}/>
            </RowValue>
          </AttributeRow>
          <AttributeRow>
            <RowLabel nested>{intl.get("min")}</RowLabel>
            <RowValue>
              <StyledTextInput type="number" value={rule.min||''} onChange={(e:any)=>{handleRuleChange('min', e.target.value)}}/>
            </RowValue>
          </AttributeRow>
          <AttributeRow>
            <RowLabel nested>{intl.get("max")}</RowLabel>
            <RowValue>
              <StyledTextInput type="number" value={rule.max||''} onChange={(e:any)=>{handleRuleChange('max', e.target.value)}}/>
            </RowValue>
          </AttributeRow>
          <AttributeRow>
            <RowLabel nested>{intl.get("matches-regex")}</RowLabel>
            <RowValue>
              <StyledTextInput value={rule.matchesRegex||''} onChange={(e:any)=>{handleRuleChange('matchesRegex', e.target.value)}}/>
            </RowValue>
          </AttributeRow>
        </Fragment>    
      }

      {
        rule?.valueType === 'number' &&
        <Fragment>
          <AttributeRow>
            <RowLabel nested>{intl.get("required")}</RowLabel>
            <RowValue>
            <Switch
              checked={rule.required||false}
              onChange={ (e)=>{handleRuleChange('required', e.target.checked)} }
              color="primary"
            />
            </RowValue>
          </AttributeRow>
          <AttributeRow>
            <RowLabel nested>{intl.get("positive")}</RowLabel>
            <RowValue>
            <Switch
              checked={rule.positive||false}
              onChange={ (e)=>{handleRuleChange('positive', e.target.checked)} }
              color="primary"
            />
            </RowValue>
          </AttributeRow>
          <AttributeRow>
            <RowLabel nested>{intl.get("negative")}</RowLabel>
            <RowValue>
            <Switch
              checked={rule.negative||false}
              onChange={ (e)=>{handleRuleChange('negative', e.target.checked)} }
              color="primary"
            />
            </RowValue>
          </AttributeRow>
          <AttributeRow>
            <RowLabel nested>{intl.get("min")}</RowLabel>
            <RowValue>
              <StyledTextInput type="number" value={rule.min||''} onChange={(e:any)=>{handleRuleChange('min', e.target.value)}}/>
            </RowValue>
          </AttributeRow>
          <AttributeRow>
            <RowLabel nested>{intl.get("max")}</RowLabel>
            <RowValue>
              <StyledTextInput type="number" value={rule.max||''} onChange={(e:any)=>{handleRuleChange('max', e.target.value)}}/>
            </RowValue>
          </AttributeRow>
        </Fragment>
      }
      {
        rule?.valueType === 'date' &&
        <Fragment>
          <AttributeRow>
            <RowLabel nested>{intl.get("min")}</RowLabel>
            <RowValue>
              <StyledTextInput type="date" value={rule.min||''} onChange={(e:any)=>{handleRuleChange('min', e.target.value)}}/>
            </RowValue>
          </AttributeRow>
          <AttributeRow>
            <RowLabel nested>{intl.get("max")}</RowLabel>
            <RowValue>
              <StyledTextInput type="date" value={rule.max||''} onChange={(e:any)=>{handleRuleChange('max', e.target.value)}}/>
            </RowValue>
          </AttributeRow>
        </Fragment>
      }
    </Fragment>
  )
}
