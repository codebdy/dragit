import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import Scrollbar from 'AdminBoard/Common/Scrollbar';
import intl from 'react-intl-universal';
import { PopuDrawer } from 'AppStudio/PopuDrawer';
import { AuthListItem } from './AuthListItem';
import { useAppStudioStore } from 'AppStudio/AppStudioStore';
import SubmitButton from 'Components/Common/SubmitButton';
import { authFields, CREATE_RX_AUTH } from './AUTH_GQLs';
import { gql, useMutation } from '@apollo/react-hooks';
import { useShowAppoloError } from 'Store/Helpers/useInfoError';

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
  const [excuteCreate, {loading:creating, error:createError}] = useMutation(CREATE_RX_AUTH, {
    //更新缓存
    update(cache, { data: { createRxAuth } }){
      cache.modify({
        id: cache.identify(studioStore?.rxApp as any),
        fields: {
          pages(existingPageRefs = []){
            const newPageRef = cache.writeFragment({
              data: createRxAuth,
              fragment: gql`
                fragment NewPage on RxAuth {
                  ${authFields}
                }
              `
            });
            return [...existingPageRefs, newPageRef];
          }
        }
      });
    },

  })

  useShowAppoloError(createError);

  const handleNew = ()=>{
    excuteCreate({variables:{appId:studioStore?.rxApp?.id}})
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
