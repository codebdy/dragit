import React from 'react';
import { makeStyles, Theme, createStyles, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import withFormField from 'components/common/withFormField';
import { useShowAppoloError } from 'store/helpers/useInfoError';
import { gql, useQuery } from '@apollo/react-hooks';

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

const SelectBox = React.forwardRef((
  props:{
    value?:string|[],
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

  //如果不从服务器读取数据，itemKey跟itemName设置无效
  let key = query ? itemKey : 'slug';
  let name = query ? itemName : 'label';

  const classes = useStyles();
  const QUERY_DATA = gql`
  query {
    ${query}{
      id
      ${itemName}
    }
  }`;
  const { loading:queryLoading, error: queryError, data } = useQuery(QUERY_DATA);
  useShowAppoloError(queryError)

  const empertyValue = '';

  const itemsData = (query? (data&&data[query])||[] : items) as any;

  const groups = groupByField ? groupBy(itemsData, groupByField) :[];

  const select =  <Select
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

export default withFormField(SelectBox);