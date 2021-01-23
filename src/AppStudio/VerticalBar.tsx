import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import Drawer from '@material-ui/core/Drawer';
import { Avatar, createMuiTheme, IconButton, Paper, ThemeProvider, Tooltip } from '@material-ui/core';
import MdiIcon from 'Components/Common/MdiIcon';
import Spacer from 'Components/Common/Spacer';
import { Fragment } from 'react';
import { DARK } from 'Store/ThemeSettings';
import intl from 'react-intl-universal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      position:'fixed',
      left:'0',
      top:'0',
      height:'100%',
      width:'60px',
      background:'#1a233a',
      color:'#8494a7',
      zIndex:theme.zIndex.modal + 1,
      display:'flex',
      flexFlow:'column',
      alignItems:'center',
    },
    logoIcon: {
      backgroundColor: theme.palette.primary.main,
      letterSpacing:'1px',
      fontWeight:'bold',
      fontSize:'20px',
      marginTop:theme.spacing(1),
    },
    buttons:{
      marginTop:theme.spacing(2),
      display:'flex',
      flexFlow:'column',
      alignItems:'center',
    },
    drawerPaper:{
      marginLeft:'60px',
    },
  }),
);

export const VerticalBar = observer(() => {
  const classes = useStyles();
  const [pagesOpen, setPagesOpen] = React.useState(false);
  const theme = createMuiTheme({
    palette: {
      type: DARK,
    },
  });

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Paper 
          className = {classes.root} 
          square
          elevation = {pagesOpen ? 1 : 6}
        >
          <Avatar
            className = {classes.logoIcon}
            variant="rounded"
          >
            <MdiIcon iconClass = "mdi-feather" color="#fff"/>
          </Avatar>
          <div className = {classes.buttons}>
            <Tooltip title={intl.get('pages')} placement="right">
              <IconButton
                onClick = {()=>{setPagesOpen(!pagesOpen)}}
              >
                <MdiIcon iconClass = "mdi-file-outline" color="#8494a7"/>
              </IconButton>
            </Tooltip>
            <Tooltip title={intl.get('navigation')} placement="right">
              <IconButton
                onClick = {()=>{}}
              >
                <MdiIcon iconClass = "mdi-file-tree-outline" color="#8494a7"/>
              </IconButton>
            </Tooltip>
          </div>
          <Spacer />
          dd
        </Paper>
      </ThemeProvider>
      <Drawer
        anchor={'left'}
        open={pagesOpen}
        onClose={()=>setPagesOpen(false)}
        classes = {{paper:classes.drawerPaper}}
      >
        sweeweweeeeeeeeeeeeee
      </Drawer>

    </Fragment>
  );
})
