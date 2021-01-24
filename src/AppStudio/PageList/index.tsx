import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import { useAppStudioStore } from 'AppStudio/AppStudioStore';
import { PageListItem } from './PageListItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      display:'flex',
      flexFlow:'column',
    },
  }),
);


export const PageList = observer(() => {
  const classes = useStyles();
  const storeStudio = useAppStudioStore();

  return (
    <div className = {classes.root}>
      {
        storeStudio?.rxApp?.pages?.map(page=>{
          return (
            <PageListItem key={page.id}>
              {page.name}
            </PageListItem>
          )
        })
      }
    </div>
  );
})
