import { makeStyles, Theme, createStyles, lighten, Toolbar, Typography, TextField, InputAdornment, Tooltip, IconButton } from "@material-ui/core";
import React, { Fragment } from "react";
import MdiIcon from "../common/MdiIcon";
import ListViewFilter from "./ListViewFilter";
import clsx from 'clsx';
import { ListViewMetaItem } from "./ListViewMetaItem";
import intl from 'react-intl-universal';

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
  }),
);

interface ListViewToolbarProps {
  keyword:string,
  numSelected: number;
  filters:Array<ListViewMetaItem>,
  batchCommands:Array<ListViewMetaItem>,
  filterValues:any, 
  onKeywordChange:(keyword:string)=>void,
  onFilterChange:(filterValues:any)=>void,
  onBatchAction:(actionSlug:string)=>void,
}

const ListViewToolbar = (props: ListViewToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected, filters, batchCommands, filterValues, onKeywordChange, onFilterChange, onBatchAction } = props;
  const [keyword, setKeyword] = React.useState(props.keyword)

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} {intl.get('records-selected')}
        </Typography>
      ) : (
        <div className={classes.title}>
        <TextField
          name="table-search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MdiIcon iconClass="mdi-magnify "/>
              </InputAdornment>
            ),
          }}
          variant = "outlined"
          size = "small"
          value = {keyword}
          onChange = {e=>{setKeyword(e.target.value as string)}}
          onKeyUp = {e=>{
              if(e.keyCode === 13) {
                onKeywordChange(keyword)
              }
            }
          }
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
                    onClick = {()=>{onBatchAction(command.slug)}}
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
};

export default ListViewToolbar