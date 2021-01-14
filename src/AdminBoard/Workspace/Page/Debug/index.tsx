import React, { Fragment } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import MdiIcon from 'Components/Common/MdiIcon';
import intl from 'react-intl-universal';
import { SpeedDialIcon } from '@material-ui/lab';
import GraphQLDebug from './DebugGraphQL';
import { useLeftDrawer } from 'Store/Helpers/useAppStore';
import {observer} from 'mobx-react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    speedDial: {
      position: 'fixed',
      bottom: 0,
      transition: 'left 0.3s',
    },
  }),
);

export const Debug = observer(()=>{
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [gqlOpen, setGqlOpen] = React.useState(false);
  const leftDrawer = useLeftDrawer();
  const fabLeft = leftDrawer.isMini ? leftDrawer.compactWidth : leftDrawer.fullWidth;
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenGql = ()=>{
    setOpen(false);
    setGqlOpen(true);
  }
  
  return (
    <Fragment>
      <SpeedDial
        ariaLabel="Debug SpeedDial"
        className={classes.speedDial}
        icon={
          <SpeedDialIcon 
            icon={<MdiIcon iconClass = "mdi-android-debug-bridge"/>}
            openIcon={<MdiIcon iconClass = "mdi-close"/>}
          />
        }
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction='up'
        style={{left:(fabLeft) + 'px'}}
      >
        <SpeedDialAction
          icon={<MdiIcon iconClass = "mdi-graphql" />}
          tooltipTitle={'GraphiQL ' + intl.get('debug')}
          tooltipPlacement = "top"
          onClick={(handleOpenGql)}
        />
        <SpeedDialAction
          icon={<MdiIcon iconClass = "mdi-file-tree" />}
          tooltipTitle={'Model Tree ' + intl.get('debug')}
          tooltipPlacement = "top"
          onClick={handleClose}
        />
      </SpeedDial>
      <GraphQLDebug open={gqlOpen} onClose = {()=>setGqlOpen(false)} />
    </Fragment>
  );
})
