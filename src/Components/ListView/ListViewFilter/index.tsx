import { makeStyles, Theme, createStyles, TextField, InputAdornment } from '@material-ui/core';
import { Observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useListViewStore } from '../ListViewStore';
import intl from 'react-intl-universal';
import MdiIcon from 'Components/Common/MdiIcon';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex:1,
    },
    keyword:{
      transition:'width 0.1s',
    },
  })
);

const ListViewFilter = React.forwardRef((
    props:any, 
    ref:any
  )=>{

  const {
    children,
    ...rest
  } = props
  const classes = useStyles();
  const [keywordFocused, setKeywordFocused] = useState(false);
  const listViewStore = useListViewStore();
 

  return (
    <Observer>
      {()=>
        <div
          className={classes.root}
          {...rest}
          ref= {ref}
        >
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
            size = "small"
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
          
          {children}
        </div>
      }
    </Observer>
  );
})

export default ListViewFilter;

