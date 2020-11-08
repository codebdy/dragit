import React, { useEffect, useRef } from 'react';
import { makeStyles, Theme, createStyles, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import axios from 'axios';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width:"100%",
    },

  }),
);

const SelectInput = React.forwardRef((
  props:{
    value?:string|[],
    label?:string,
    variant?:string,
    multiple?:boolean,
    helperText?:string,
    onChange:any,
    withoutEmpertyItem?:boolean,
    itemKey?:string,
    itemName?:string,
    fromServer?:boolean,
    items?:Array<any>,
    dataUrl?:string,
  },
  ref
)=>{
  const{value, 
    label, 
    variant, 
    multiple, 
    helperText, 
    onChange, 
    withoutEmpertyItem, 
    itemKey = 'id',
    itemName = 'name',
    fromServer,
    items,
    dataUrl,
    ...rest
  } = props;
  const classes = useStyles();
  const [menuItems, setMenuItems] = React.useState(items);
  const [loading, setLoading] = React.useState(false);

  const empertyValue = multiple?[]:'';
  const mountedRef = useRef(true);

  useEffect(() => {
    if(!fromServer || !dataUrl){
      return;
    }

    setLoading(true);
    axios(
      {
        method:"get",
        url:dataUrl,
      }
    ).then(res => {
      if(mountedRef.current){
        setMenuItems(res.data);
        setLoading(false);
      }
    })
    .catch(err => {
      console.log('server error');
      setLoading(false);
    })
    
    return () => { 
      mountedRef.current = false
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const select =  <Select
      multiple = {multiple}
      value={value || empertyValue}
      onChange={onChange}
      label={label}
    >
      { !withoutEmpertyItem &&
        <MenuItem value={empertyValue}>
          <em>None</em>
        </MenuItem>
      }
      {
        menuItems?.map((item)=>{
          return (
          <MenuItem key = {item[itemKey]}value={item[itemKey]}>{item[itemName]}</MenuItem>
          )
        })
      }
    </Select>
  //console.log(props);
  return (
    <FormControl variant={variant as any} className={classes.root} {...rest}>
      <InputLabel 
      >{label}</InputLabel>
      {
        loading ?
        <Skeleton animation="wave" height={50} width="80%" />
        :
        select
      }

      <FormHelperText>{helperText}</FormHelperText>
      
    </FormControl>
  )
})

export default SelectInput