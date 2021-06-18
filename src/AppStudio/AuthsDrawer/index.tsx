import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import Scrollbar from 'Common/Scrollbar';
import intl from 'react-intl-universal';
import { PopuDrawer } from 'AppStudio/PopuDrawer';
import { AuthListItem } from './AuthListItem';
import { useAppStudioStore } from 'AppStudio/AppStudioStore';
import SubmitButton from 'Components/common/SubmitButton';
import { useShowServerError } from 'Store/Helpers/useInfoError';
import { useDragItStore } from 'Store/Helpers/useDragItStore';
import useLayzyMagicPost from 'Data/useLayzyMagicPost';
import { MagicPostBuilder } from 'Data/MagicPostBuilder';
import { RxAuth } from './constants';

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
  const dragItStore = useDragItStore();
  const studioStore = useAppStudioStore();
  const [excuteCreate, {loading:creating, error:createError}] = useLayzyMagicPost({
    onCompleted(data:any){
      console.log(data);
      dragItStore.setSuccessAlert(true);
      if(studioStore?.rxApp?.auths && data){
        studioStore?.rxApp?.auths.push(data[RxAuth])
      }
    },
  })

  useShowServerError(createError);

  const handleNew = ()=>{
    const data = new MagicPostBuilder()
      .setModel(RxAuth)
      .setSingleData(
        {
          app:studioStore?.rxApp?.id,
          rxSlug:'new-auth',
          name:intl.get('new-auth')
        }
      )
      .toData();
    excuteCreate({data});
  }

  return (
    <PopuDrawer
      open={open}
      onClose={onClose}
      title = {intl.get('authority')}
      titleAction = {
        <SubmitButton 
          variant="outlined" 
          color = "primary"
          onClick = {handleNew}
          submitting = {creating}
        >{intl.get('add-new')}</SubmitButton>
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
