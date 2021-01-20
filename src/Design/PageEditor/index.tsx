import React, { Fragment, useEffect, useState } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, Container, IconButton, useTheme } from '@material-ui/core';
import intl from 'react-intl-universal';
import Scrollbar from 'AdminBoard/Common/Scrollbar';
import Spacer from 'Components/Common/Spacer';
import MdiIcon from 'Components/Common/MdiIcon';
import MouseFollower from './Core/MouseFollower';
import DesignerLayout from 'Design/Layout';
import LeftContent from './LeftContent';
import { IPageSchema } from 'Base/Model/IPage';
import PageSkeleton from 'AdminBoard/Workspace/Common/ModuleSkeleton';
import { IMeta } from 'Base/Model/IMeta';
import { ComponentView } from './Core/ComponentView';
import { RXNode } from 'Base/RXNode/RXNode';
import { NodeToolbar } from './Core/NodeToolbar';
import { IToolboxItem } from './Toolbox/IToolboxItem';
import { DragCusor } from './Core/DragCusor';
import { ComponentLabel } from './Core/ComponentLabel';
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
import { RemoveCommand } from './Commands/RemoveCommand';
import { DuplicateCommand } from './Commands/DuplicateCommand';

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

function makeCanvas(){
  return RXNode.make<IMeta>(
    {
      name:'Canvas'
    }
  )
}

export const PageEditor = observer((
  props:{
    pageId:ID,
    onClose:()=>void
  }
) =>{
  const {pageId, onClose} = props;
  const classes = useStyles();
  const [editorStore] = useState(new PageEditorStore());
  const {data, loading, error} = useQuery(GET_PAGE, {variables:{id:pageId}});
  const [savePage, {error:saveError, loading:saving}] = useMutation(SAVE_PAGE);

  const [pageSchema, setPageSchema] = useState<IPageSchema|undefined>(/*pageMeta?.schema*/);
  const [metas, setMetas] = useState<Array<IMeta>>([])
  const appStore = useAppStore();

  useShowAppoloError(error||saveError);

  const theme = useTheme(); 
  useAuthCheck(AUTH_CUSTOMIZE);

  const handleMouseUp = ()=>{
    if(editorStore.dragOverParam && (editorStore.draggedToolboxItem || editorStore.draggedNode)){
      let targetNode = editorStore.dragOverParam?.targetNode;
      let dragNode = editorStore.draggedNode;
      if(!dragNode && editorStore.draggedToolboxItem?.meta){
        dragNode = RXNode.make<IMeta>(cloneObject(editorStore.draggedToolboxItem?.meta));
      }
      if(dragNode && targetNode) {
        editorStore?.operateNode(dragNode, targetNode, editorStore.dragOverParam.position);
      }
    }
    editorStore.setDragOverParam(undefined);
    editorStore.setDraggedNode(undefined);
    editorStore.setDraggedToolboxItem(undefined);
    document.body.classList.remove('can-not-be-selected');
  }

  useEffect(()=>{
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  

  useEffect(() => {
    if(data){
      //setPage(data?.page);
      setPageSchema(cloneObject(data?.page?.schema));
      //相当于复制一个Json副本，不保存的话直接扔掉
      setMetas(cloneObject(data?.page?.schema?.layout || []));      
    }

  },[data]);
 
  useEffect(()=>{
    let newCanvas = makeCanvas();
    newCanvas.parse(metas);
    editorStore.setCanvas(newCanvas);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[metas])

  const handleCancel = () => {
    if(editorStore.isDirty){
      appStore.confirmAction(intl.get('changing-not-save-message'), ()=>{
        editorStore.reset();
        onClose();
      })
    }
    else{
      editorStore.reset();
      onClose();
    }
  };

  const handleSave = () => {
    savePage({variables:{page:{
      id:pageId,
      schema:{
        ...pageSchema,
        layout:editorStore.canvas?.getChildrenMetas(),
      },
    }
    }})
    editorStore.setIsDirty(false);    
  };

  const handleScroll = ()=>{
    editorStore.scroll();
  }

  const handleStartDragMetas = (item:IToolboxItem)=>{
    editorStore.setDraggedToolboxItem(item);
    editorStore.setSelectedNode(undefined);
    document.body.classList.add('can-not-be-selected');
  }

  const handlePropChange = (propName:string, value:any)=>{
    //if(canvasStore.selectedNode){
    //  backupToUndoList(canvasStore.selectedNode?.id);        
    //  canvasStore.selectedNode.meta.props = canvasStore.selectedNode.meta.props || {};
    //  canvasStore.selectedNode.meta.props[propName] = value;
    //  canvasStore.setSelectedNode(canvasStore.selectedNode);
    //  canvasStore.setRedoList([]);
    //  canvasStore.refreshNode(canvasStore.selectedNode?.id);
    //}
  }

  const handlPageChange = (page:IPageSchema)=>{
    //backupToUndoList(undefined);
    //setPageSchema(page);
  }

  const handleUndo = ()=>{
    editorStore.undo();
  }

  const handleRedo = ()=>{
    editorStore.redo();
  }

  const handleClear = ()=>{
    editorStore.clear();
  }

  
  const handleBeginDrag = ()=>{
    editorStore.setDraggedNode(editorStore.selectedNode);
    editorStore.setSelectedNode(undefined);
    document.body.classList.add('can-not-be-selected')
  }

  const handleRemove = ()=>{
    if(editorStore.selectedNode){
      editorStore.excuteCommand(new RemoveCommand(editorStore.selectedNode))
    }
  }

  const handleDupliate = ()=>{
    if(editorStore.selectedNode){
      editorStore.excuteCommand(new DuplicateCommand(editorStore.selectedNode))
    }
  }

  const handleSelectParent = ()=>{
    editorStore.setSelectedNode(editorStore.selectedNode?.parent);
  }

  let draggedLabel = editorStore.draggedToolboxItem ?editorStore.draggedToolboxItem?.title || intl.get(editorStore.draggedToolboxItem?.titleKey||'') : editorStore.draggedNode?.meta.name;
   return (
    <PageEditorStoreProvider value = {editorStore}>
      <Backdrop className={classes.backdrop} open={true}>        
        <DesignerLayout
          leftArea = {
            <LeftContent 
              pageSchema={pageSchema} 
              selectedNode = {editorStore.selectedNode}
              onPropChange = {handlePropChange}
              onSettingsChange={handlPageChange}
              onStartDragToolboxItem = {handleStartDragMetas}
            />
          }

          toolbar = {
            <Fragment>
              <IconButton 
                onClick = {()=>{
                  editorStore.setShowOutline(!editorStore.showOutline)
                }}
              >
                <MdiIcon iconClass="mdi-border-none-variant" color={editorStore.showOutline ? theme.palette.primary.main : ''}/>
              </IconButton>
              <IconButton
                onClick = {()=>{
                  editorStore.setShowPaddingX(!editorStore.showPaddingX)
                }}
              >
                <MdiIcon iconClass="mdi-arrow-expand-horizontal" color={editorStore.showPaddingX ? theme.palette.primary.main : ''}/>
              </IconButton>
              <IconButton
                onClick = {()=>{
                  editorStore.setShowPaddingY(!editorStore.showPaddingY)
                }}
                >
                <MdiIcon iconClass="mdi-arrow-expand-vertical" color={editorStore.showPaddingY ? theme.palette.primary.main : ''}/>
              </IconButton>
              <IconButton 
                disabled = {editorStore.undoList.length === 0}
                onClick = {handleUndo}
              >
                <MdiIcon iconClass="mdi-undo"/>
              </IconButton>
              <IconButton disabled = {editorStore.redoList.length === 0}
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
                disabled = {!editorStore.isDirty}
              >
                {intl.get('save')}
              </SubmitButton>
            </Fragment>
          }
        >
          {loading? <Container><PageSkeleton /></Container> :
            <Scrollbar permanent className={classes.scrollBar} onScroll ={handleScroll}>
              {editorStore.canvas&&
                <ComponentView 
                  node ={editorStore.canvas}
                />
              }
              {
                editorStore.selectedNode &&
                <Fragment>
                  <ComponentLabel 
                    node={editorStore.selectedNode}
                    followDom = {editorStore.selectedDom}
                  />
                  <NodeToolbar 
                    onBeginDrag = {handleBeginDrag}
                    onRemove = {handleRemove}
                    onSelectParent = {handleSelectParent}
                    onDuplicate = {handleDupliate}
                  />
                </Fragment>
              }
              {
                editorStore.activeNode &&
                <ComponentLabel 
                  node={editorStore.activeNode}
                  followDom = {editorStore.activeNode.dom}
                />
              }
            </Scrollbar>
          }
        </DesignerLayout>
        <Fragment>
          {
            (editorStore.draggedToolboxItem || editorStore.draggedNode) &&
            <MouseFollower label={ draggedLabel || 'unknow'} />
          }
          {
            (editorStore.draggedToolboxItem || editorStore.draggedNode) &&
            <DragCusor/>
          }
        </Fragment>      
      </Backdrop>
    </PageEditorStoreProvider>
  );
})