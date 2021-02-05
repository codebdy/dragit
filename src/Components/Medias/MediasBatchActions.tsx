import React from 'react';
import { makeStyles, Theme, createStyles, lighten, Typography, IconButton, Tooltip } from '@material-ui/core';
import classNames from 'classnames';
import intl from "react-intl-universal";
import MdiIcon from 'Components/common/MdiIcon';
import Spacer from 'Components/common/Spacer';
import { IMedia } from 'Base/Model/IMedia';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex:'1',
      display: 'flex',
      height:'100%',
      alignItems:'center',
      paddingLeft:theme.spacing(1),
    },
    shell:
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

export default function MediasBatchActions(
  props:{
    selectedMedias:Array<IMedia>,
    onClearSelected:()=>void,
    onRemoveSelected:()=>void,
  }
){
  const {selectedMedias, onClearSelected, onRemoveSelected} = props;
  const classes = useStyles();
  const toolIconSize = 21;

  return (
    <div className={classNames(classes.root, classes.shell)}>
      <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
        {selectedMedias.length} {intl.get('records-selected')}
      </Typography>
      <Spacer />
      <Tooltip title={intl.get('clear-selected')} arrow placement="top">
        <IconButton aria-label={intl.get('clear-selected')} component="span"
          onClick = {onClearSelected}
        >
          <MdiIcon iconClass="mdi-broom" size={toolIconSize} />
        </IconButton>
      </Tooltip>
      <Tooltip title={intl.get('delete')} arrow placement="top">
        <IconButton aria-label={intl.get('delete')} component="span"
          onClick = {onRemoveSelected}
        >
          <MdiIcon iconClass="mdi-delete-sweep-outline" size={toolIconSize} />
        </IconButton>
      </Tooltip>
      {
        selectedMedias.length === 1 &&
        <Tooltip title={intl.get('replace')} arrow placement="top">
          <IconButton aria-label={intl.get('replace')} component="span">
            <MdiIcon iconClass="mdi-file-replace-outline" size={toolIconSize} />
          </IconButton>
        </Tooltip>
      }
    </div>
  )
}
