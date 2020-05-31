import React from "react";
import { createStyles, Theme, makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import classNames from "classnames";
import FontIcon from "components/common/FontIcon"
import IconButton from '@material-ui/core/IconButton';

interface FixedBarProps{
}

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      right:'0',
      top:'calc(50% - 100px)',
      width:'56px',
      background:'#7367f0',
      color:"rgba(255,255,255,1)",
      display: 'flex',
      flexFlow: 'column',
      justifyContent: 'center',
      alignItems:'center',
      borderRadius:'5px 0 0 5px',
      boxShadow:theme.shadows[15],
      padding:'10px 0',
    },
  }),
);

export default function FixedBar(
  props:FixedBarProps = {}
) {
  const classes = useStyles();
  return(
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <IconButton aria-label="Design page">
          <FontIcon iconClass="mdi mdi-pencil-ruler" />
        </IconButton>
        <IconButton aria-label="Design page">
          <FontIcon iconClass="mdi mdi-view-module" />
        </IconButton>
        <IconButton aria-label="Design page">
          <FontIcon iconClass="mdi mdi-file-tree" />
        </IconButton>
        <IconButton aria-label="Design page">
          <FontIcon iconClass="mdi mdi-cog" />
        </IconButton>
      </div>
    </ThemeProvider>
  )
}