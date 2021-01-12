import { makeStyles, Theme, createStyles, InputAdornment, TextField } from '@material-ui/core';
import MdiIcon from 'Components/Common/MdiIcon';
import { useListViewStore } from 'Components/ListView/ListViewStore';
import React, { useState } from 'react';
import intl from 'react-intl-universal';
import { IFilterProps } from '../IFilterProps';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    keyword:{
      transition:'width 0.1s',
    },
  })
);

const ListViewKeywordFilter = React.forwardRef((
    props: IFilterProps, 
    ref:any
  )=>{

  const {
    'data-rxid':rxid,
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
    listViewStore.setWhereGraphiQL(rxid, gql);
    listViewStore.excuteQuery();
  }

  return (
    <TextField
      name="table-search"
      type="search"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <MdiIcon iconClass="mdi-magnify "/>
          </InputAdornment>
        ),
      }}
      className={classes.keyword}
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
      style={{...style, width}}
    />
  );
})

export default ListViewKeywordFilter;

