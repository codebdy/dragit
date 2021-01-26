import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import { useAppStudioStore } from './AppStudioStore';
import { PageEditor } from './PageEditor';
import { NavigationEditor } from './NavigationEditor';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
    },
  }),
);


export const WorkSpace = observer(() => {
  const classes = useStyles();
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
