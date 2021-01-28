import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import Scrollbar from 'AdminBoard/Common/Scrollbar';
import intl from 'react-intl-universal';
import { PopuDrawer } from 'AppStudio/PopuDrawer';
import { Button } from '@material-ui/core';
import { AuthListItem } from './AuthListItem';
import { useAppStudioStore } from 'AppStudio/AppStudioStore';

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
  const studioStore = useAppStudioStore();

  const handleNew = ()=>{

  }
  return (
    <PopuDrawer
      open={open}
      onClose={onClose}
      title = {intl.get('authority')}
      titleAction = {
        <Button 
          variant="outlined" 
          color = "primary"
          onClick = {handleNew}
        >{intl.get('add-new')}</Button>
      }
    >
      <Scrollbar className = {classes.root}>
        <AuthListItem />
        {
          studioStore?.rxApp?.auths?.map(auth=>{
            return (
              <AuthListItem key = {auth.id} auth = {auth}/>
            )
          })
        }
      </Scrollbar>
    </PopuDrawer>

  );
})
