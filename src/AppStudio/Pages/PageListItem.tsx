import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import { useState } from 'react';
import PageAction from './PageAction';
import { IRxPage } from 'Base/Model/IRxPage';
import { CircularProgress, TextField, Typography } from '@material-ui/core';
import { useEffect } from 'react';
import { useShowServerError } from 'Store/Helpers/useInfoError';
import { useAppStudioStore } from 'AppStudio/AppStudioStore';
import classNames from 'classnames';
import ActionButton from 'AppStudio/ActionButton';
import { useDragItStore } from 'Store/Helpers/useDragItStore';
import intl from 'react-intl-universal';
import useLayzyMagicPost from 'Data/useLayzyMagicPost';
import useLayzyMagicDelete from 'Data/useLayzyMagicDelete';
import { MagicPostBuilder } from 'Data/MagicPostBuilder';
import { RxPage } from 'modelConstants';
import { MagicDeleteBuilder } from 'Data/MagicDeleteBuilder';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      display:'flex',
      justifyContent:'space-between',
      padding:theme.spacing(0.4, 2),
      borderBottom: theme.palette.divider + ' solid 1px',
      alignItems:'center',
      cursor:'pointer',
      minHeight: theme.spacing(6),
    },
    name:{
      height:'100%',
      flex:1,
      display:'flex',
      alignItems:'center',
    },
    selected:{
      color:theme.palette.primary.main,
    },
    rightArea:{
      display:'flex',
    },
    save:{
      marginLeft:theme.spacing(1),
    }
  }),
);


export const PageListItem = observer((
  props:{
    page:IRxPage,
    onClick?:()=>void,
  }
) => {
  const {page, onClick} = props;
  const [hover, setHover] = useState(false);
  const [name, setName] = useState(page.name);
  const [editing, setEditing] = useState(false);
  const classes = useStyles();
  const dragItStore = useDragItStore();
  const studioStore = useAppStudioStore();

  useEffect(()=>{
    setName(page.name)
  },[page.name])

  const [excuteSaveRxPage, {loading:saving, error}] = useLayzyMagicPost({
    onCompleted(){
      dragItStore.setSuccessAlert(true)
    }
  });
  const [excuteRemoveRxPage, {loading:removing, error:removeError}] = useLayzyMagicDelete(
    {
      onCompleted: (data)=>{
        if(page.id === studioStore?.pageEditor?.editingPage?.id){
          studioStore.editPage(undefined);
        }
        if(studioStore?.rxApp?.pages){
          studioStore.setRxAppPages(studioStore.rxApp.pages.filter(aPage=>aPage.id !== page.id));
        }
        dragItStore.setSuccessAlert(true);
      }
    }
  );

  const [excuteDuplicate, {loading:duplicating, error:duplicateError}] = useLayzyMagicPost<{RxPage:IRxPage}>({
    onCompleted(data:{RxPage:IRxPage}){
      dragItStore.setSuccessAlert(true);
      if(studioStore?.rxApp?.pages){
        studioStore.setRxAppPages([...studioStore.rxApp.pages, data.RxPage]);
      }
    },
  });

  useShowServerError(error || removeError || duplicateError);

  const handleEditName = ()=>{
    setEditing(true);
  }

  const handleCancel = ()=>{
    setName(page.name);
    setEditing(false);
  }

  const handleFinishedEdit = ()=>{
    setEditing(false);
    if(name !== page.name){
      const data = new MagicPostBuilder()
        .setModel(RxPage)
        .setSingleData(
          {
            ...page,
            name
          }
        )
        .toData();
      excuteSaveRxPage({data});
    }
  }

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    const newValue = event.target.value as string;
    setName(newValue);
  }

  const handleDesign = ()=>{
    onClick && onClick();
  }

  const handleDuplicate = ()=>{
    const {id, ...pageData} = page;
    pageData.name = 'Copy of ' + page.name;
    const data = new MagicPostBuilder()
      .setModel(RxPage)
      .setSingleData(pageData)
      .toData()
    excuteDuplicate({data});
  }

  const handleRemove = ()=>{
    const data = new MagicDeleteBuilder()
      .setModel(RxPage)
      .addId(page.id)
      .toData();
    excuteRemoveRxPage({data});
  }

  const handleKeyEnter = (event:React.KeyboardEvent<HTMLElement>)=>{
    if(event.key === 'Enter') {
      handleFinishedEdit()
    }
  }

  const handleClick = ()=>{
    if((page.id !== studioStore?.pageEditor?.editingPage?.id && studioStore?.pageEditor?.isDirty)
      ||studioStore?.navigationEditor?.isDirty){
      dragItStore?.confirmAction(intl.get('changing-not-save-message'),()=>{
        onClick && onClick();
      })
    }
    else{
      onClick && onClick();
    }
  }

  const loading = saving || removing || duplicating;

  return (
    <div 
      className = {
        classNames(
          classes.root,
          {[classes.selected]:studioStore?.pageEditor?.editingPage?.id === page.id}
        )
      } 
      onMouseOver = {()=>{setHover(true)}}
      onMouseLeave = {()=>{setHover(false)}}
    >
      {
        editing 
        ? <TextField 
            autoFocus
            size = "small" 
            variant = "outlined" 
            value = {name === undefined ? '' : name} 
            onChange = {handleChange}
            onKeyUp = {handleKeyEnter}
          />
        : <div onClick={handleClick} className={classes.name} >
            <Typography variant = "subtitle1">{name}</Typography>
          </div>
      }
      <div className={classes.rightArea}>
        {
          loading &&
          <CircularProgress size = {24}/>
        }
        {
          hover&& !editing && !loading &&
          <div>
            <PageAction 
              onCloseMenu={()=>setHover(false)} 
              onEditName = {handleEditName}
              onDesign = {handleDesign}
              onDuplicate = {handleDuplicate}
              onRemove = {handleRemove}
            />
          </div>
        }
        {
          editing && 
          <>
            <ActionButton onClick = {handleCancel} icon = "mdi-close" />
            <ActionButton onClick = {handleFinishedEdit} icon = "mdi-check" />
          </>
        }      
      </div>

    </div>
  );
})
