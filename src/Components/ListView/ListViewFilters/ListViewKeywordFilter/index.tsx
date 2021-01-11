import { makeStyles, Theme, createStyles, InputAdornment, TextField } from '@material-ui/core';
import MdiIcon from 'Components/Common/MdiIcon';
import { InputSize } from 'Components/Inputs/InputPropTypes';
import { useListViewStore } from 'Components/ListView/ListViewStore';
import React from 'react';
import { useState } from 'react';
import intl from 'react-intl-universal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    keyword:{
      transition:'width 0.1s',
    },
  })
);

const ListViewKeywordFilter = React.forwardRef((
    props:{
      size:InputSize
    }, 
    ref:any
  )=>{

  const {
    size,
    ...rest
  } = props
  const classes = useStyles();
 
  const [keywordFocused, setKeywordFocused] = useState(false);
  const listViewStore = useListViewStore();
  
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
      variant = "outlined"
      size = {size}
      value = {listViewStore.keywords || ''}
      onChange = {e=>{listViewStore.setKeywords(e.target.value as string)}}
      onKeyUp = {e=>{
          if(e.keyCode === 13) {
            //onKeywordChange(listViewStore.keywords)
          }
        }
      }

      onFocus = {()=>setKeywordFocused(true)}
      onBlur = {()=>setKeywordFocused(false)}

      style={{width:keywordFocused ? '300px' : '200px'}}

      placeholder = {intl.get('please-input-and-press-enter')}
    />
  );
})

export default ListViewKeywordFilter;

