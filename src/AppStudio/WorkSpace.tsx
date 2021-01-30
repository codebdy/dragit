import * as React from 'react';
import { observer } from 'mobx-react';
import { useAppStudioStore } from './AppStudioStore';
import { RxPageEditor } from './RxPageEditor';
import RxNavigationEditor from './RxNavigationEditor';
import IMenuItem from 'Base/Model/IMenuItem';

export const WorkSpace = observer(() => {
  const studioStore = useAppStudioStore();

  const handleChangeNavigation = (items:Array<IMenuItem>)=>{
    studioStore?.navigationEditor?.setCurrentData(items);
  }

  return (
    <>
      {
        studioStore?.pageEditor?.editingPage &&
        <RxPageEditor rxPage = {studioStore?.pageEditor?.editingPage}/>
      }
      {
        studioStore?.navigationEditor && 
        <RxNavigationEditor 
          items = {studioStore?.rxApp?.navigation_items} 
          onChange = {handleChangeNavigation}
        />
      }
    </>
  );
})
