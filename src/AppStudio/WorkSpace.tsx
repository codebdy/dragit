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
        studioStore?.editingPage &&
        <RxPageEditor rxPage = {studioStore?.editingPage}/>
      }
      {
        studioStore?.editingNavigation && 
        <NavigationEditor />
      }
    </>
  );
})
