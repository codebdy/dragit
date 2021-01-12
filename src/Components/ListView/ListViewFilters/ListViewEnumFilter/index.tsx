import { makeStyles, Theme, createStyles, Select, FormControl, FormHelperText, InputLabel, MenuItem } from '@material-ui/core';
import React from 'react';
import { IFilterProps } from '../IFilterProps';
import { IEnumItem } from '../../../../Base/Model/IEnumItem';
import { useState } from 'react';
import intl from "react-intl-universal";
import { useListViewStore } from 'Components/ListView/ListViewStore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
    },
    label:{
      background:theme.palette.background.paper,
      padding:theme.spacing(0, 1),
    },

  })
);

const ListViewEnumFilter = React.forwardRef((
  props:IFilterProps&{
    metas?:IEnumItem[],
    field?:string,
  }, 
  ref:any
)=>{

  const {
    id,
    variant = "outlined",
    label,
    width,
    size,
    withoutAll,
    helperText,
    metas,
    style,
    field,
    ...rest
  } = props
  const classes = useStyles();
  const [value, setValue] = useState('');
  const listViewStore = useListViewStore();
  
  const handleChange = (event:React.ChangeEvent<{ value: unknown }>)=>{
    let newValue = event.target.value as string;
    setValue(newValue);
    const gql = newValue ? `{column:${field}, operator:EQ, value:"${newValue}"}` : newValue;
    listViewStore.setWhereGraphiQL(id, gql);
    listViewStore.excuteQuery();
  }

  return (
    <FormControl variant={variant} size={size} ref={ref} {...rest} style={{...style, width}}>
      <InputLabel className={classes.label}>{label}</InputLabel>
      <Select
        value={value}
        onChange={handleChange}
      >
        {!withoutAll&&
          <MenuItem value="">
            <em>{intl.get('all')}</em>
          </MenuItem>
        }
        {
          metas?.map(meta=><MenuItem key={meta.value} value={meta.value}>{meta.name}</MenuItem>)
        }
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>    
  );
})

export default ListViewEnumFilter;

