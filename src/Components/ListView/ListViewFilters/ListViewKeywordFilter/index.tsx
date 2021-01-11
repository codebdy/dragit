import { makeStyles, Theme, createStyles, InputAdornment, TextField } from '@material-ui/core';
import MdiIcon from 'Components/Common/MdiIcon';
import { useListViewStore } from 'Components/ListView/ListViewStore';
import React from 'react';
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
    variant = "outlined",
    size,
    width = '260px',
    style,
    ...rest
  } = props
  const classes = useStyles();
 
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
      variant = {variant}
      size = {size}
      value = {listViewStore.keywords || ''}
      onChange = {e=>{listViewStore.setKeywords(e.target.value as string)}}
      onKeyUp = {e=>{
          if(e.keyCode === 13) {
            //onKeywordChange(listViewStore.keywords)
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

