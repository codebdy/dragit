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
    id,
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
    listViewStore.searchableFields.forEach(field=>{
      keywords.split(' ').forEach(keyword=>{
        if(keyword.trim()){
          gql = ` ${gql} {column:${field}, operator:LIKE, value:"%${keyword.trim()}%"} `            
        }
      })
    })
    listViewStore.setWhereGraphiQL(id, gql);
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
          if(e.keyCode === 13) {
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

