import React, { Fragment } from 'react';
import {MenuItem, Select, Switch } from '@material-ui/core';
import { AttributeRow, RowLabel, RowValue } from 'designer/Attrebutebox/AttributeRow';
import intl from 'react-intl-universal';
import StyledTextInput from 'designer/Attrebutebox/Inputs/StyledTextInput';

export interface ValidateRule{
  valueType?:string;
  ruleType?:string;
  maxLength?:number;
  minLength?:number;
  max?:number|string;
  min?:number|string;
  pattern?:string;
  errorMessage?:string;
  [key:string]:any;
}

export default function AttributeBoxValidateArea(props:{rule?:ValidateRule, onChange:(rule:ValidateRule)=>void}){
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

  const handleRuleTypeChange =  (event: React.ChangeEvent<{ value: unknown }>)=>{
    let ruleType = event.target.value as string;
    onChange({...rule, ruleType:ruleType});
  };


  return (
    <Fragment>
      <AttributeRow>
        <RowLabel>{intl.get("required")}</RowLabel>
        <RowValue>
        <Switch
          checked={rule?.required||false}
          onChange={ (e)=>{handleRuleChange('required', e.target.checked)} }
          color="primary"
        />
        </RowValue>
      </AttributeRow>

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
            <MenuItem value='string'>{intl.get('string')}</MenuItem>
            <MenuItem value='number'>{intl.get('number')}</MenuItem>
            <MenuItem value='date'>{intl.get('date')}</MenuItem>
          </Select>
        </RowValue>
      </AttributeRow>
      {
        rule?.valueType === 'string' &&
        <Fragment>
          <AttributeRow>
            <RowLabel>{intl.get("validate-rules")}</RowLabel>
            <RowValue>
              <Select
                value={rule?.ruleType || ''}
                onChange={handleRuleTypeChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value='email'>{intl.get('email')}</MenuItem>
                <MenuItem value='url'>{intl.get('url')}</MenuItem>
                <MenuItem value='customized'>{intl.get('customized')}</MenuItem>
              </Select>
            </RowValue>
          </AttributeRow>

          <AttributeRow>
            <RowLabel nested>{intl.get("min-length")}</RowLabel>
            <RowValue>
              <StyledTextInput type="number" value={rule.minLength||''} onChange={(e:any)=>{handleRuleChange('minLength', e.target.value)}}/>
            </RowValue>
          </AttributeRow>
          <AttributeRow>
            <RowLabel nested>{intl.get("max-length")}</RowLabel>
            <RowValue>
              <StyledTextInput type="number" value={rule.maxLength||''} onChange={(e:any)=>{handleRuleChange('maxLength', e.target.value)}}/>
            </RowValue>
          </AttributeRow>
          {
            rule?.ruleType === 'customized'&&
              <AttributeRow>
                <RowLabel nested>{intl.get("matches-regex")}</RowLabel>
                <RowValue>
                  <StyledTextInput value={rule.pattern||''} onChange={(e:any)=>{handleRuleChange('pattern', e.target.value)}}/>
                </RowValue>
              </AttributeRow>
          }
          <AttributeRow>
            <RowLabel>{intl.get("error-message")}</RowLabel>
            <RowValue>
              <StyledTextInput value={rule?.errorMessage||''} onChange={(e:any)=>{handleRuleChange('errorMessage', e.target.value)}}/>
            </RowValue>
          </AttributeRow>

        </Fragment>    
      }

      {
        rule?.valueType === 'number' &&
        <Fragment>
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
