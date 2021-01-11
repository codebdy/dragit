import { makeStyles, Theme, createStyles, lighten, Toolbar, Typography, TextField, InputAdornment, Tooltip, IconButton } from "@material-ui/core";
import React, { Fragment, useState } from "react";
import MdiIcon from "../../Common/MdiIcon";
import ListViewFilter from "../ListViewFilter/index-back";
import clsx from 'clsx';
import { ILabelItem } from "../../../Base/Model/ILabelItem";
import intl from 'react-intl-universal';
import { ICommand } from "Base/Model/ICommand";

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
    keyword:{
      transition:'width 0.1s',
    },
  }),
);

interface ListViewToolbarProps {
  keyword?:string,
  numSelected: number;
  filters:Array<ILabelItem>,
  batchCommands:Array<ICommand>,
  filterValues:any, 
  onKeywordChange:(keyword?:string)=>void,
  onFilterChange:(filterValues:any)=>void,
  onBatchAction:(action:ICommand)=>void,
}

const ListViewToolbar = React.forwardRef((props: ListViewToolbarProps, ref:any) => {
  const classes = useToolbarStyles();
  const { numSelected, filters, batchCommands, filterValues, onKeywordChange, onFilterChange, onBatchAction } = props;
  const [keyword, setKeyword] = useState(props.keyword)
  const [keywordFocused, setKeywordFocused] = useState(false);

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
      ref= {ref}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} {intl.get('records-selected')}
        </Typography>
      ) : (
        <div className={classes.title}>
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
          value = {keyword || ''}
          onChange = {e=>{setKeyword(e.target.value as string)}}
          onKeyUp = {e=>{
              if(e.keyCode === 13) {
                onKeywordChange(keyword)
              }
            }
          }

          onFocus = {()=>setKeywordFocused(true)}
          onBlur = {()=>setKeywordFocused(false)}

          style={{width:keywordFocused ? '300px' : '200px'}}

          placeholder = {intl.get('please-input-and-press-enter')}
        />
        </div>
      )}
      {numSelected > 0 ? (
        <Fragment>
          {
            batchCommands?.map((command, index)=>{
              return(
                <Tooltip title={command.label} key={command.slug}>
                  <IconButton aria-label={command.label} name={'batch-action-' + command.slug}
                    onClick = {()=>{onBatchAction(command)}}
                  >
                    <MdiIcon iconClass = {command.icon} size="20" />
                  </IconButton>
                </Tooltip>
              )
            })
          }
        </Fragment>        
      ) : (
        <Fragment>
          <ListViewFilter filters = {filters} values={filterValues} onChange = {onFilterChange}/>
        </Fragment>        
      )}
    </Toolbar>
  );
});

export default ListViewToolbar