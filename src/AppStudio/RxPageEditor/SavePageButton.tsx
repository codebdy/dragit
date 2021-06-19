import * as React from 'react';
import { observer } from 'mobx-react';
import intl from 'react-intl-universal';
import SubmitButton from 'Components/common/SubmitButton';
import { useAppStudioStore } from 'AppStudio/AppStudioStore';
import { useShowServerError } from 'Store/Helpers/useInfoError';
import { toJS } from 'mobx';
import { useDragItStore } from 'Store/Helpers/useDragItStore';
import useLayzyAxios from 'Data/useLayzyAxios';
import { API_MAGIC_POST } from 'APIs/magic';
import { MagicPostBuilder } from 'Data/MagicPostBuilder';
import { RxPage } from 'modelConstants';

export const SavePageButton = observer(() => {
  const studioStore = useAppStudioStore();
  const dragItStore = useDragItStore();
  const [excuteSaveRxPage, {loading:saving, error}] = useLayzyAxios( API_MAGIC_POST,{
    onCompleted(){
      studioStore?.pageEditor?.setIsDirty(false);
      dragItStore.setSuccessAlert(true);
    }
  } );
  useShowServerError(error);

  const handleSave = ()=>{
    const rxPageData = toJS(studioStore?.pageEditor?.currentData) as any; 
    console.assert(rxPageData, 'Page data is undefined or null');
    const data = new MagicPostBuilder()
      .setModel(RxPage)
      .setSingleData(rxPageData)
      .toData();
    excuteSaveRxPage({data});      
  }
  
  return (
    <SubmitButton 
      variant = "contained" 
      color= "primary"
      submitting = {saving}
      disabled = {!studioStore?.pageEditor?.isDirty}
      onClick = {handleSave}
    >
      {intl.get('save')}
    </SubmitButton>
  );
})
