import * as React from 'react';
import { observer } from 'mobx-react';
import { useAppStudioStore } from './AppStudioStore';
import { PageEditor } from './Pages/PageEditor';
import { NavigationEditor } from './Navigation/NavigationEditor';

export const WorkSpace = observer(() => {
  const studioStore = useAppStudioStore();
  return (
    <>
      {
        studioStore?.editingPage &&
        <PageEditor />
      }
      {
        studioStore?.editingNavigation && 
        <NavigationEditor />
      }
    </>
  );
})
