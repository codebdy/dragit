import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import { useState } from 'react';
import PageAction from './PageAction';
import { IRxPage } from 'Base/Model/IRxPage';
import { CircularProgress, TextField } from '@material-ui/core';
import { useEffect } from 'react';
import { gql, useMutation } from '@apollo/react-hooks';
import { DUPLICATE_RX_PAGE, REMOVE_RX_PAGE, SAVE_RX_PAGE } from "Base/GraphQL/PAGE_GQLs";
import { useShowAppoloError } from 'Store/Helpers/useInfoError';
import { useAppStudioStore } from 'AppStudio/AppStudioStore';
import classNames from 'classnames';
import { pageFieldsGQL } from 'Base/GraphQL/GQLs';

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
  const studioStore = useAppStudioStore();

  useEffect(()=>{
    setName(page.name)
  },[page.name])

  const [excuteSaveRxPage, {loading:saving, error}] = useMutation( SAVE_RX_PAGE );
  const [excuteRemoveRxPage, {loading:removing, error:removeError}] = useMutation( REMOVE_RX_PAGE,
    {
      update: (cache, { data: { removeRxPage } })=>{
        cache.modify({
          id: cache.identify(studioStore?.rxApp as any),
          fields: {
            pages:(existingPageRefs = [], { readField })=>{
              return existingPageRefs.filter(
                (pageRef:any) => page.id !== readField('id', pageRef)
              );
            }
          }
        });
      },
      onCompleted: (data)=>{
        if(page.id === studioStore?.editingPage?.id){
          studioStore.setEditingPage(undefined);
        }
      }
    }
  );

  const [excuteDuplicate, {loading:duplicating, error:duplicateError}] = useMutation(DUPLICATE_RX_PAGE, {
    //更新缓存
    update:(cache, { data: { duplicateRxPage } })=>{
      cache.modify({
        id: cache.identify(studioStore?.rxApp as any),
        fields: {
          pages(existingPageRefs = []){
            const newPageRef = cache.writeFragment({
              data: duplicateRxPage,
              fragment: gql`
                fragment NewPage on RxPage {
                  ${pageFieldsGQL}
                }
              `
            });
            return [...existingPageRefs, newPageRef];
          }
        }
      });
    },
  });

  useShowAppoloError(error || removeError || duplicateError);

  const handleEditName = ()=>{
    setEditing(true);
  }

  const handleFinishedEdit = ()=>{
    setEditing(false);
    if(name !== page.name){
      excuteSaveRxPage({variables:{rxPage:{id:page.id, name}}})
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
    excuteDuplicate({variables:{id:page.id}});
  }

  const handleRemove = ()=>{
    excuteRemoveRxPage({variables:{id:page.id}});
  }

  const loading = saving || removing || duplicating;

  return (
    <div 
      className = {
        classNames(
          classes.root,
          {[classes.selected]:studioStore?.editingPage?.id === page.id}
        )
      } 
      onClick={onClick}
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
            onBlur = {handleFinishedEdit}
            onChange = {handleChange}
            onKeyUp = {
              e=>{
                if(e.key === 'Enter') {
                  handleFinishedEdit()
                }
              }
            }
          />
        : name
      }
      <div className={classes.rightArea}>
        {
          loading &&
          <CircularProgress size = {24}/>
        }
        {
          hover&& !editing && !loading &&
          <div onClick={e=>{
            e.stopPropagation();
          }}>
            <PageAction 
              onCloseMenu={()=>setHover(false)} 
              onEditName = {handleEditName}
              onDesign = {handleDesign}
              onDuplicate = {handleDuplicate}
              onRemove = {handleRemove}
            />
          </div>
        }      
      </div>

    </div>
  );
})
