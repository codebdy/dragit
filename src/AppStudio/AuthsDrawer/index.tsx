import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import Scrollbar from 'AdminBoard/Common/Scrollbar';
import intl from 'react-intl-universal';
import { PopuDrawer } from 'AppStudio/PopuDrawer';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      display:'flex',
      flexFlow:'column',
    },
  }),
);


export const AuthsDrawer = observer((
  props:{
    open:boolean,
    onClose: ()=>void,
  }
) => {
  const {open, onClose} = props;
  const classes = useStyles();

  return (
    <PopuDrawer
      open={open}
      onClose={onClose}
      title = {intl.get('authority')}
      titleAction = {
        <Button 
          variant="outlined" 
          color = "primary"
          //onClick = {handleNew}
        >{intl.get('add-new')}</Button>
      }
    >
      <Scrollbar className = {classes.root}>
        Auths
      </Scrollbar>
    </PopuDrawer>

  );
})
