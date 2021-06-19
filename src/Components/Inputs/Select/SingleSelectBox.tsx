import React from 'react';
import { makeStyles, Theme, createStyles, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useShowServerError } from 'Store/Helpers/useInfoError';
import { useMagicQuery } from 'Data/useMagicQuery';
import { MagicQueryBuilder } from 'Data/MagicQueryBuilder';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  let retValue: any[] = [];  
  array?.forEach(function (o:any) {
    const group = o[name]
    groups[group] = groups[group] || []
    groups[group].push(o)
  })

  Object.keys(groups).forEach(groupName =>{
    retValue.push({type:'groupTitle', title:groupName})
    groups[groupName].forEach((item:any) =>{
      retValue.push(item)
    })
  })

  return retValue;
}

export const SingleSelectBox = React.forwardRef((
  props:{
    value?:any,
    label?:string,
    variant?:string,
    helperText?:string,
    onChange:any,
    withoutEmpertyItem?:boolean,
    itemKey?:string,
    itemName?:string,
    items?:Array<any>;
    groupByField?:string,
    query?:string,
    loading?:boolean,
  },
  ref
)=>{
  const{value, 
    label, 
    variant, 
    helperText, 
    onChange, 
    withoutEmpertyItem, 
    itemKey = 'id',
    itemName = 'name',
    query,
    items = [],
    groupByField,
    loading,
    ...rest
  } = props;


  let key =  itemKey;
  let name = itemName;

  const classes = useStyles();

  const { loading:queryLoading, error: queryError, data } = useMagicQuery(new MagicQueryBuilder());

  useShowServerError(queryError)  

  const empertyValue = '';

  const itemsData = (query? (data)||[] : items) as any;
  const groups = groupByField ? groupBy(itemsData, groupByField) :[];

  const handleChange = (event: React.ChangeEvent<{ name?: string | undefined, value: unknown }> )=>{
    const newValue = event.target.value as any;
    onChange && onChange({
      target:{
        value:{[key]:newValue}
      }
    });
  }


  const select =  <Select
      value={(value && value[key]) || empertyValue}
      onChange={handleChange}
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
    <FormControl variant={variant as any} {...rest}>
      <InputLabel 
      >{label}</InputLabel>
      {
        loading || queryLoading?
        <Skeleton animation="wave" height={50} width="80%" />
        :
        (itemsData && select)
      }

      <FormHelperText>{helperText}</FormHelperText>
      
    </FormControl>
  )
})
