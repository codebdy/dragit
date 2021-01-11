import { makeStyles, Theme, createStyles, Select, FormControl, FormHelperText, InputLabel, MenuItem } from '@material-ui/core';
import React from 'react';
import { IFilterProps } from '../IFilterProps';
import { IEnumItem } from '../../../../Base/Model/IEnumItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
    },
    label:{
      background:theme.palette.background.paper,
    },

  })
);

const ListViewEnumFilter = React.forwardRef((
  props:IFilterProps&{
    metas?:IEnumItem[],
  }, 
  ref:any
)=>{

  const {
    variant = "outlined",
    label,
    width,
    size,
    withoutAll,
    helperText,
    metas,
    style,
    ...rest
  } = props
  const classes = useStyles();
 
  const handleChange = ()=>{
    
  }

  return (
    <FormControl variant={variant} size={size} ref={ref} {...rest} style={{...style, width}}>
      <InputLabel className={classes.label}>{label}</InputLabel>
      <Select
        value={''}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>全部</em>
        </MenuItem>
        {
          metas?.map(meta=><MenuItem key={meta.value} value={meta.value}>{meta.name}</MenuItem>)
        }
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>    
  );
})

export default ListViewEnumFilter;

