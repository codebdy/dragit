import React from 'react';
import { makeStyles, Theme, createStyles, FormControl, InputLabel, Select, MenuItem, FormHelperText, ListSubheader } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { AxiosRequestConfig } from 'axios';
import withSkeleton from 'base/HOCs/withSkeleton';
import { useAxios } from 'base/Hooks/useAxios';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width:"100%",
    },

    group:{
      paddingLeft:theme.spacing(2),
    }

  }),
);

const groupBy = (array:any, name:string)=>{
  const groups = {} as any
  array?.forEach(function (o:any) {
    const group = o[name]
    groups[group] = groups[group] || []
    groups[group].push(o)
  })
  return groups;
  //return Object.keys(groups).map(function (group) {
  //  return groups[group]
  //})
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
    fromUrl?:boolean;
    url?:string,
    items?:Array<any>;
    groupByField?:string,
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
    fromUrl,
    url,
    items,
    groupByField,
    ...rest
  } = props;

  //如果不从服务器读取数据，itemKey跟itemName设置无效
  let key = fromUrl ? itemKey : 'slug';
  let name = fromUrl ? itemName : 'label';

  const classes = useStyles();
  const [request] = React.useState<AxiosRequestConfig>({
    method:"get",
    url:url,
  })
  const [menuItems, loading] = useAxios(request);

  const empertyValue = multiple?[]:'';

  const itemsData = (fromUrl? menuItems : items) as any;

  const groups = groupByField ? groupBy(itemsData, groupByField) :{};

  const select =  <Select
      multiple = {multiple}
      value={value || empertyValue}
      onChange={onChange}
      label={label}
      ref = {ref}
    >
      { !withoutEmpertyItem &&
        <MenuItem value={empertyValue}>
          <em>None</em>
        </MenuItem>
      }
      {
        groupByField && Object.keys(groups).map((groupName, index)=>{
          let group = groups[groupName];
          return (
            <div key={groupName + index} className={classes.group}>
              <div><b>{groupName}</b></div>
              {
                group?.map((item:any, index: any)=>{
                  return (
                  <MenuItem key = {`${item[key]}-${index}`} value={item[key]}>{item[name]}</MenuItem>
                  )
                })
              }
            </div>
          )
        })
      }
      {
        !groupByField && itemsData?.map((item:any, index: any)=>{
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

//显示调用的缓兵之计
const SelectBoxAny = withSkeleton(SelectBox) as any;

export default SelectBoxAny;