import React, { useEffect, useRef } from 'react';
import { makeStyles, Theme, createStyles, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import axios from 'axios';
import withSkeleton from 'base/HOCs/withSkeleton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width:"100%",
    },

  }),
);

export interface SelectItems{
  fromUrl?:boolean;
  items?:Array<any>;
  url?:string;
}

const SelectBox = React.forwardRef((
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
    data:SelectItems,
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
    data,
    ...rest
  } = props;
  const {
    fromUrl,
    items,
    url,
  } = data;

  //如果不从服务器读取数据，itemKey跟itemName设置无效
  let key = fromUrl ? itemKey : 'slug';
  let name = fromUrl ? itemName : 'label';

  const classes = useStyles();
  const [menuItems, setMenuItems] = React.useState(items);
  const [loading, setLoading] = React.useState(false);

  const empertyValue = multiple?[]:'';
  const mountedRef = useRef(true);

  useEffect(() => {
    if(!fromUrl || !url){
      return;
    }
    setLoading(true);
    axios(
      {
        method:"get",
        url:url,
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
        menuItems?.map((item, index)=>{
          return (
          <MenuItem key = {`${item[key]}-${index}`} value={item[key]}>{item[name]}</MenuItem>
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

export default withSkeleton(SelectBox);