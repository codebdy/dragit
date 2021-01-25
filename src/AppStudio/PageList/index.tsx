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


export const PageList = observer((
  props:{
    onClose:()=>void,
  }
) => {
  const {onClose} = props;
  const classes = useStyles();
  const studioStore = useAppStudioStore();
  const handleClick = (pageId:string)=>{
    studioStore?.setEditingPageId(pageId);
    onClose();
  }

  return (
    <div className = {classes.root}>
      {
        studioStore?.rxApp?.pages?.map(page=>{
          return (
            <PageListItem 
              key={page.id}
              page = {page}
              onClick = {()=>handleClick(page.id)}
            />
          )
        })
      }
    </div>
  );
})
