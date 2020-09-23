import { makeStyles, Theme, createStyles, lighten, Toolbar, Typography, TextField, InputAdornment, Tooltip, IconButton } from "@material-ui/core";
import React, { Fragment } from "react";
import MdiIcon from "./common/MdiIcon";
import ListViewFilter from "./ListViewFilter";
import clsx from 'clsx';
import DeleteIcon from '@material-ui/icons/Delete';

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
  numSelected: number;
}

const ListViewToolbar = (props: ListViewToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
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
        />
        </div>
      )}
      {numSelected > 0 ? (
        <Fragment>
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Fragment>        
      ) : (
        <Fragment>
          <ListViewFilter/>
        </Fragment>        
      )}
    </Toolbar>
  );
};

export default ListViewToolbar