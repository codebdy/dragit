import React from 'react';
import { makeStyles, Theme, createStyles, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { AxiosRequestConfig } from 'axios';
import withSkeleton from 'base/HOCs/withSkeleton';
import { useAxios } from 'base/Hooks/useAxios';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width:"100%",
    },

    nest:{
      paddingLeft:theme.spacing(2),
    },
    nest2:{
      paddingLeft:theme.spacing(4),
    }

  }),
);

const groupBy = (array:any, name:string)=>{
  let groups = {} as any
  array?.forEach(function (o:any) {
    const group = o[name]
    groups[group] = groups[group] || []
    groups[group].push(o)
  })
  //return groups;
  let retValue: any[] = [];
  Object.keys(groups).forEach(groupName =>{
    retValue.push({type:'groupTitle', title:groupName})
    groups[groupName].forEach((row:any) =>{
      retValue.push(row)
    })
  })

  return retValue;
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

  const groups = groupByField ? groupBy(itemsData, groupByField) :[];

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
        groupByField &&groups.map((item:any, index)=>{
          return (
            item.type==='groupTitle'?
            <div key={index} className={classes.nest}><b>{item.title}</b></div>
            :
            <MenuItem key = {`${item[key]}-${index}`} value={item[key]} className={classes.nest2}>{item[name]}</MenuItem>
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