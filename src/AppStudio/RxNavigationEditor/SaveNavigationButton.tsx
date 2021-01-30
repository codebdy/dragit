import * as React from 'react';
import { observer } from 'mobx-react';
import intl from 'react-intl-universal';
import SubmitButton from 'Components/Common/SubmitButton';
import { useAppStudioStore } from 'AppStudio/AppStudioStore';
import { useMutation } from '@apollo/react-hooks';
import { useShowAppoloError } from 'Store/Helpers/useInfoError';
import { toJS } from 'mobx';
import { useDragItStore } from 'Store/Helpers/useDragItStore';
import { SAVE_RX_APP } from 'Base/GraphQL/APP_GQLs';

export const SaveNavigationButton = observer(() => {
  const studioStore = useAppStudioStore();
  const dragItStore = useDragItStore();
  const [excuteSaveRxApp, {loading:saving, error}] = useMutation( SAVE_RX_APP,{
    onCompleted(){
      studioStore?.editNavigation();
      studioStore?.navigationEditor?.setIsDirty(false);
      dragItStore.setSuccessAlert(true);
    }
  } );
  useShowAppoloError(error);

  const handleSave = ()=>{
    const rxApp = toJS(studioStore?.rxApp);
    const items = toJS(studioStore?.navigationEditor?.currentData); 
    excuteSaveRxApp({variables:{rxApp:{id:rxApp?.id, navigation_items:items}}});      
  }
  
  return (
    <SubmitButton 
      variant = "contained" 
      color= "primary"
      submitting = {saving}
      disabled = {!studioStore?.navigationEditor?.isDirty}
      onClick = {handleSave}
    >
      {intl.get('save')}
    </SubmitButton>
  );
})
