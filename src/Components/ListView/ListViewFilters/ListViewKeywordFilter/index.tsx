import { makeStyles, Theme, createStyles, InputAdornment, TextField } from '@material-ui/core';
import { DADA_RXID_CONST } from 'rx-drag/models/RxNode';
import classNames from 'classnames';
import MdiIcon from 'Components/common/MdiIcon';
import { useListViewStore } from 'Components/ListView/ListViewStore';
import React, { useState } from 'react';
import intl from 'react-intl-universal';
import { IFilterProps } from '../IFilterProps';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      paddingBottom:'5px',
    },
  })
);

const ListViewKeywordFilter = React.forwardRef((
    props: IFilterProps&{
      className:any,
    }, 
    ref:any
  )=>{

  const {
    className,
    [DADA_RXID_CONST]:rxid,
    variant = "outlined",
    size,
    width = '260px',
    style,
    ...rest
  } = props
  const classes = useStyles();
  const [keywords, setKeywords] = useState('');
 
  const listViewStore = useListViewStore();
  
  const handleSearch = ()=>{
    let gql = '';
    keywords.split(' ').forEach(keyword=>{    
      if(keyword.trim()){
        let oneKeywordSql = '';
        listViewStore.columns.forEach(column=>{
          if(column.meta.props?.searchable && column.meta.props?.field){
            oneKeywordSql = ` ${oneKeywordSql} {column:${column.meta.props?.field}, operator:LIKE, value:"%${keyword.trim()}%"} `            
          }
        }) 
        
        if(oneKeywordSql){
          gql = `${gql} {OR:[${oneKeywordSql}]}`;
        }
      }
    })
    listViewStore.setWhereGraphQL(rxid, gql);
    listViewStore.excuteQuery();
  }

  return (
    <div className={classNames(className, classes.root)} style={{...style, width}}>
      <TextField
        name="table-search"
        type="search"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MdiIcon iconClass="mdi-magnify "/>
            </InputAdornment>
          ),
        }}
       
        variant = {variant}
        size = {size}
        value = {keywords}
        onChange = {e=>{setKeywords(e.target.value as string || '')}}
        onKeyUp = {e=>{
            if(e.key === 'Enter') {
              handleSearch()
            }
          }
        }
        placeholder = {intl.get('please-input-and-press-enter')}
        {...rest}
        
      />
    </div>
  );
})

export default ListViewKeywordFilter;

