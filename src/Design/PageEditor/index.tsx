import React, { Fragment, useEffect, useState } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, Container, IconButton, useTheme } from '@material-ui/core';
import intl from 'react-intl-universal';
import Scrollbar from 'AdminBoard/Common/Scrollbar';
import Spacer from 'Components/Common/Spacer';
import MdiIcon from 'Components/Common/MdiIcon';
import DesignerLayout from 'Design/Layout';
import LeftContent from './LeftContent';
import PageSkeleton from 'AdminBoard/Workspace/Common/ModuleSkeleton';
import { cloneObject } from '../../Utils/cloneObject';
import SubmitButton from 'Components/Common/SubmitButton';
import { useAuthCheck } from 'Store/Helpers/useAuthCheck';
import { AUTH_CUSTOMIZE } from 'Base/authSlugs';
import { observer } from 'mobx-react';
import { ID } from 'Base/Model/graphqlTypes';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_PAGE, SAVE_PAGE } from 'Base/GraphQL/GQLs';
import { useShowAppoloError } from 'Store/Helpers/useInfoError';
import { PageEditorStore } from './PageEditorStore';
import { useAppStore } from 'Store/Helpers/useAppStore';
import { PageEditorStoreProvider } from './useDesign';
import { PageEditorCore } from './PageEditorCore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      display: 'flex',
      flexFlow: 'row',
      height:'100%',
    },


    toolboxIcon:{
      marginRight:theme.spacing(2),
    },

    cancelButton:{
      marginRight:theme.spacing(1),
    },
    scrollBar:{
      flex:1,
      display:'flex',
      flexFlow: 'column',
    },

  }),
);

export const PageEditor = observer((
  props:{
    pageId:ID,
    onClose:()=>void
  }
) =>{
  const {pageId, onClose} = props;
  const classes = useStyles();
  const [editorStore, setEditorStore] = useState<PageEditorStore>();
  const {data, loading, error} = useQuery(GET_PAGE, {variables:{id:pageId}});
  const [savePage, {error:saveError, loading:saving}] = useMutation(SAVE_PAGE);

  const appStore = useAppStore();

  useShowAppoloError(error||saveError);

  const theme = useTheme(); 
  useAuthCheck(AUTH_CUSTOMIZE);

  useEffect(() => {
    //复制一个副本
    setEditorStore(new PageEditorStore( cloneObject(data?.page)))

  },[data]);
 
  const handleCancel = () => {
    if(editorStore?.isDirty){
      appStore.confirmAction(intl.get('changing-not-save-message'), ()=>{
        editorStore?.reset();
        onClose();
      })
    }
    else{
      editorStore?.reset();
      onClose();
    }
  };

  const handleSave = () => {
    savePage({variables:{page:{
      id:pageId,
      layout:editorStore?.canvas?.getChildrenMetas(),
    }
    }})
    editorStore?.setIsDirty(false);    
  };

  const handleScroll = ()=>{
    editorStore?.refreshToolbarAndLabel();
  }

  const handleUndo = ()=>{
    editorStore?.undo();
  }

  const handleRedo = ()=>{
    editorStore?.redo();
  }

  const handleClear = ()=>{
    editorStore?.clear();
  }

   return (
    <PageEditorStoreProvider value = {editorStore}>
      <Backdrop className={classes.backdrop} open={true}>        
        <DesignerLayout
          leftArea = {
            <LeftContent />
          }

          toolbar = {
            <Fragment>
              <IconButton 
                onClick = {()=>{
                  editorStore?.setShowOutline(!editorStore?.showOutline)
                }}
              >
                <MdiIcon iconClass="mdi-border-none-variant" color={editorStore?.showOutline ? theme.palette.primary.main : ''}/>
              </IconButton>
              <IconButton
                onClick = {()=>{
                  editorStore?.setShowPaddingX(!editorStore?.showPaddingX)
                }}
              >
                <MdiIcon iconClass="mdi-arrow-expand-horizontal" color={editorStore?.showPaddingX ? theme.palette.primary.main : ''}/>
              </IconButton>
              <IconButton
                onClick = {()=>{
                  editorStore?.setShowPaddingY(!editorStore?.showPaddingY)
                }}
                >
                <MdiIcon iconClass="mdi-arrow-expand-vertical" color={editorStore?.showPaddingY ? theme.palette.primary.main : ''}/>
              </IconButton>
              <IconButton 
                disabled = {editorStore?.undoList.length === 0}
                onClick = {handleUndo}
              >
                <MdiIcon iconClass="mdi-undo"/>
              </IconButton>
              <IconButton disabled = {editorStore?.redoList.length === 0}
                onClick = {handleRedo}
              >
                <MdiIcon iconClass="mdi-redo"/>
              </IconButton>
              <IconButton onClick = {handleClear}>
                <MdiIcon iconClass="mdi-delete-sweep-outline"/>
              </IconButton>
              <Spacer></Spacer>
              <Button onClick={handleCancel} className = {classes.cancelButton}>
                {intl.get('go-back')}
              </Button>
              <SubmitButton
                variant = "contained"
                color = "primary"         
                size="large"
                onClick={handleSave} 
                submitting={saving}
                disabled = {!editorStore?.isDirty}
              >
                {intl.get('save')}
              </SubmitButton>
            </Fragment>
          }
        >
          {loading? <Container><PageSkeleton /></Container> :
            <Scrollbar permanent className={classes.scrollBar} onScroll ={handleScroll}>
              {editorStore&&
                <PageEditorCore editorStore = {editorStore} />
              }
            </Scrollbar>
          }
        </DesignerLayout>
      </Backdrop>
    </PageEditorStoreProvider>
  );
})