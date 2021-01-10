import React, { Fragment } from 'react';
import {MenuItem, Select, Switch, FormControl, FormControlLabel, InputLabel, TextField } from '@material-ui/core';
import { AttributeRow, } from 'design1/PageEditor/AttrebuteBox/AttributeRow';
import intl from 'react-intl-universal';
import { IValidateRule } from '../../../base1/Model/IValidateRule';

export default function AttributeBoxValidateArea(props:{rule?:IValidateRule, onChange:(rule:IValidateRule)=>void}){
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
    <div>
      <AttributeRow>
        <FormControlLabel
          control={
            <Switch
              checked={rule?.required||false}
              onChange={ (e)=>{handleRuleChange('required', e.target.checked)} }
              color="primary"
              //size="small" 
            />
          }
          style={{margin:'2px'}}
          label={<span style={{fontSize:'0.9rem'}}>{intl.get("required")}</span>}
        />        
      </AttributeRow>

      <AttributeRow>
        <FormControl variant="outlined" size="small" fullWidth>
          <InputLabel>{intl.get("validate-type")}</InputLabel>
          <Select
            value={rule?.valueType || ''}
            onChange={handleTypeChange}
            variant="outlined"
            label = {intl.get("validate-type")}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value='string'>{intl.get('string')}</MenuItem>
            <MenuItem value='number'>{intl.get('number')}</MenuItem>
            <MenuItem value='date'>{intl.get('date')}</MenuItem>
          </Select>
        </FormControl>
      </AttributeRow>
      {
        rule?.valueType === 'string' &&
        <Fragment>
          <AttributeRow>
            <FormControl variant="outlined" size="small" fullWidth>
              <InputLabel>{intl.get("validate-rules")}</InputLabel>
              <Select
                label = {intl.get("validate-rules")}
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
            </FormControl>
          </AttributeRow>

          <AttributeRow>
            <TextField 
              fullWidth
              variant="outlined" 
              size = "small"
              label={intl.get("min-length")}
              type="number" 
              value={rule.minLength||''}
              onChange={(e:any)=>{handleRuleChange('minLength', e.target.value)}}
            ></TextField>
            <TextField 
              size="small"
              fullWidth
              variant="outlined" 
              label={intl.get("max-length")}
              type="number" 
              value={rule.maxLength||''}
              onChange={(e:any)=>{handleRuleChange('maxLength', e.target.value)}}
            ></TextField>
          </AttributeRow>
          {
            rule?.ruleType === 'customized'&&
            <AttributeRow>
              <TextField
                size="small" 
                fullWidth
                variant="outlined" 
                label={intl.get("pattern")}
                value={rule.pattern||''}
                onChange={(e:any)=>{handleRuleChange('pattern', e.target.value)}}
              ></TextField>
            </AttributeRow>
          }
          <AttributeRow>
            <TextField 
              size="small"
              fullWidth
              variant="outlined"
              multiline
              rows={2} 
              label={intl.get("error-message")}
              value={rule?.errorMessage||''} 
                onChange={(e:any)=>{handleRuleChange('errorMessage', e.target.value)}}
            ></TextField>
          </AttributeRow>
        </Fragment>    
      }

      {
        rule?.valueType === 'number' &&
        <Fragment>
          <AttributeRow>
            <TextField 
              size="small"
              fullWidth
              variant="outlined" 
              label={intl.get("min")}
              type="number" 
              value={rule.min||''} 
              onChange={(e:any)=>{handleRuleChange('min', e.target.value)}}
            ></TextField>
            <TextField
              size="small" 
              fullWidth
              variant="outlined" 
              label={intl.get("max")}
              type="number" 
              value={rule.max||''} 
              onChange={(e:any)=>{handleRuleChange('max', e.target.value)}}
            ></TextField>
          </AttributeRow>
        </Fragment>
      }
      {
        rule?.valueType === 'date' &&
        <Fragment>
          <AttributeRow>
            <TextField
              size="small" 
              fullWidth
              variant="outlined" 
              label={intl.get("min")}
              type="date" 
              InputLabelProps={{ shrink: true }}
              value={rule.min||''} 
              onChange={(e:any)=>{handleRuleChange('min', e.target.value)}}
            ></TextField>
          </AttributeRow>
          <AttributeRow>
            <TextField 
              size="small"
              fullWidth
              variant="outlined" 
              label={intl.get("max")}
              type="date" 
              InputLabelProps={{ shrink: true }}
              value={rule.max||''} 
              onChange={(e:any)=>{handleRuleChange('max', e.target.value)}}
            ></TextField>
          </AttributeRow>
        </Fragment>
      }


    </div>
  )
}
