import * as React from 'react';
import { observer } from 'mobx-react';
import { useAppStudioStore } from './AppStudioStore';
import { RxPageEditor } from './RxPageEditor';
import NavigationEditor from './Navigation/NavigationEditor';

export const WorkSpace = observer(() => {
  const studioStore = useAppStudioStore();

  return (
    <>
      {
        studioStore?.pageEditor?.editingPage &&
        <RxPageEditor rxPage = {studioStore?.pageEditor?.editingPage}/>
      }
      {
        studioStore?.editingNavigation && 
        <NavigationEditor />
      }
    </>
  );
})
