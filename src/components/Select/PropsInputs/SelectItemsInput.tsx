import { createStyles, FormControlLabel, makeStyles, Switch, Theme } from '@material-ui/core';
import { SelectItems } from 'components/Select/SelectBox';
import React from 'react';
import { PropsInputProps } from '../../../base/PropsInputs/PropsEditorProps';
import {StyledTextAreaInput} from '../../../designer/Attrebutebox/Inputs/StyledInput';
import intl from 'react-intl-universal';
import SelectItemsInputItemDialog from '../../../designer/Attrebutebox/Inputs/SelectItemsInputItemDialog';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    switchLabel: {
      fontSize:'0.8rem',
      color:'#cdcfd0', 
    },

  }),
);

export default function SelectItemsInput(props:PropsInputProps){
  const {field, value, onChange} = props;
  const classes = useStyles();
  const [inputValue, setInputValue] = React.useState<SelectItems>({...value});

  const handleFromUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = {...inputValue, fromUrl:event.target.checked};
    setInputValue(newValue);
    onChange(field, newValue);
  };  

  const handleUrlChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let newValue =  {...inputValue, url:(event.target.value as string)};
    setInputValue(newValue);
    onChange(field, newValue);
  };  

  const handleItemsChange = (newItems:Array<any>)=>{
    let newValue =  {...inputValue, items:newItems};
    onChange(field, newValue)
  }

  return (
    <div>
      <FormControlLabel
        control={
          <Switch
            checked={inputValue.fromUrl || false}
            onChange={handleFromUrlChange}
            name="FromUrl"
            color="primary"
          />
        }
        label={<span className={classes.switchLabel}>{intl.get("from-url")}</span>}
      />
      {
        inputValue.fromUrl ?
          <StyledTextAreaInput 
            value={inputValue.url ||''}
            onChange={handleUrlChange}
            rows="2"
          />
        :
        <SelectItemsInputItemDialog value={inputValue.items} onChange={handleItemsChange} />    
      }

    </div>
  )
}
