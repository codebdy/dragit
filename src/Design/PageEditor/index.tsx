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
import { CursorPosition } from './Core/IDragOverParam';
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
import { MoveInCommand } from './Commands/MoveInCommand';
import { MoveAfterCommand } from './Commands/MoveAfterCommand';
import { MoveBeforeCommand } from './Commands/MoveBeforeCommand';
import { MoveInTopCommand } from './Commands/RemoveCommand';

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
  const [eidtorStore] = useState(new PageEditorStore());
  const {data, loading, error} = useQuery(GET_PAGE, {variables:{id:pageId}});
  const [savePage, {error:saveError, loading:saving}] = useMutation(SAVE_PAGE);

  const [pageSchema, setPageSchema] = useState<IPageSchema|undefined>(/*pageMeta?.schema*/);
  const [metas, setMetas] = useState<Array<IMeta>>([])
  const [dirty, setIsDirty] = useState(false);
  const appStore = useAppStore();

  useShowAppoloError(error||saveError);

  const theme = useTheme(); 

  useAuthCheck(AUTH_CUSTOMIZE);

  useEffect(()=>{
    if(eidtorStore.undoList.length > 0 && (eidtorStore.redoList.length !== 0 || eidtorStore.undoList.length !== 0)){
      setIsDirty(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[eidtorStore.undoList.length])  
  
  const operateNode = (targetNode:RXNode<IMeta>, draggedNode:RXNode<IMeta>, position:CursorPosition)=>{
    if(targetNode.id === draggedNode.id){
      return false;
    }
    if(position === 'in-bottom' || position === 'in-right' || position === 'in-center'){
      eidtorStore.excuteCommand(new MoveInCommand(targetNode, draggedNode));
      //draggedNode.moveIn(targetNode);
      return true;        
    }
    if(position === 'in-top' || position === 'in-left'){
      eidtorStore.excuteCommand(new MoveInTopCommand(targetNode, draggedNode));
      //draggedNode.moveInTop(targetNode);
      return true;  
    }
    if(position === 'out-bottom' || position === 'out-right'){
      eidtorStore.excuteCommand(new MoveAfterCommand(targetNode, draggedNode));
      //draggedNode.moveAfter(targetNode);
      return true;  
    }
    if(position === 'out-top' || position === 'out-left'){
      eidtorStore.excuteCommand(new MoveBeforeCommand(targetNode, draggedNode));
      //draggedNode.moveBefore(targetNode);
      return true;  
    }
    return false;  
  }

  const handleMouseUp = ()=>{
    if(eidtorStore.dragOverParam && (eidtorStore.draggedToolboxItem || eidtorStore.draggedNode)){
      let targetNode = eidtorStore.dragOverParam?.targetNode;
      let dragNode = eidtorStore.draggedNode;
      if(!dragNode && eidtorStore.draggedToolboxItem?.meta){
        dragNode = RXNode.make<IMeta>(cloneObject(eidtorStore.draggedToolboxItem?.meta));
      }
      if(dragNode && targetNode) {
        //const drageNodeParentId = dragNode.parent?.id;
        operateNode(targetNode, dragNode, eidtorStore.dragOverParam.position);
        //console.log('oldrefreshID, drageNodeParentId', canvasStore.refreshNodeId, drageNodeParentId);
        //eidtorStore.refreshNode(drageNodeParentId);
        //eidtorStore.refreshNode(dragNode.id);
        //eidtorStore.refreshNode(targetNode.id);
        //eidtorStore.setSelectedNode(dragNode);
      }
    }
    eidtorStore.setDragOverParam(undefined);
    eidtorStore.setDraggedNode(undefined);
    eidtorStore.setDraggedToolboxItem(undefined);
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
    eidtorStore.setCanvas(newCanvas);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[metas])

  const handleCancel = () => {
    if(dirty){
      appStore.confirmAction(intl.get('changing-not-save-message'), ()=>{
        eidtorStore.reset();
        onClose();
      })
    }
    else{
      eidtorStore.reset();
      onClose();
    }
  };

  const handleSave = () => {
    savePage({variables:{page:{
      id:pageId,
      schema:{
        ...pageSchema,
        layout:eidtorStore.canvas?.getChildrenMetas(),
      },
    }
    }})
    setIsDirty(false);    
  };

  const handleScroll = ()=>{
    eidtorStore.scroll();
  }

  const handleStartDragMetas = (item:IToolboxItem)=>{
    eidtorStore.setDraggedToolboxItem(item);
    eidtorStore.setSelectedNode(undefined);
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
    eidtorStore.undo();
  }

  const handleRedo = ()=>{
    eidtorStore.redo();
  }

  const handleClear = ()=>{
    //backupToUndoList(undefined);    
    eidtorStore.clear();
    eidtorStore.refreshNode(eidtorStore.canvas?.id)      
    eidtorStore.setSelectedNode(undefined);
    //canvasStore.setRedoList([]);
  }

  
  const handleBeginDrag = ()=>{
    eidtorStore.setDraggedNode(eidtorStore.selectedNode);
    eidtorStore.setSelectedNode(undefined);
    document.body.classList.add('can-not-be-selected')
  }

  const handleRemove = ()=>{
    if(eidtorStore.selectedNode){
      //backupToUndoList(undefined);
      let parentId = eidtorStore.selectedNode.parent?.id;
      eidtorStore.selectedNode.remove();
      eidtorStore.setSelectedNode(undefined);
      ///canvasStore.setRedoList([]);
      eidtorStore.refreshNode(parentId)
    }
  }

  const handleDupliate = ()=>{
    if(eidtorStore.selectedNode){
      //backupToUndoList(undefined);      
      let newNode = eidtorStore.selectedNode?.duplicate();
      eidtorStore.setSelectedNode(newNode);
      //canvasStore.setRedoList([]);
      eidtorStore.refreshNode(eidtorStore.selectedNode?.parent?.id);
    }
  }

  const handleSelectParent = ()=>{
    eidtorStore.setSelectedNode(eidtorStore.selectedNode?.parent);
  }

  let draggedLabel = eidtorStore.draggedToolboxItem ?eidtorStore.draggedToolboxItem?.title || intl.get(eidtorStore.draggedToolboxItem?.titleKey||'') : eidtorStore.draggedNode?.meta.name;
   return (
    <PageEditorStoreProvider value = {eidtorStore}>
      <Backdrop className={classes.backdrop} open={true}>        
        <DesignerLayout
          leftArea = {
            <LeftContent 
              pageSchema={pageSchema} 
              selectedNode = {eidtorStore.selectedNode}
              onPropChange = {handlePropChange}
              onSettingsChange={handlPageChange}
              onStartDragToolboxItem = {handleStartDragMetas}
            />
          }

          toolbar = {
            <Fragment>
              <IconButton 
                onClick = {()=>{
                  eidtorStore.setShowOutline(!eidtorStore.showOutline)
                }}
              >
                <MdiIcon iconClass="mdi-border-none-variant" color={eidtorStore.showOutline ? theme.palette.primary.main : ''}/>
              </IconButton>
              <IconButton
                onClick = {()=>{
                  eidtorStore.setShowPaddingX(!eidtorStore.showPaddingX)
                }}
              >
                <MdiIcon iconClass="mdi-arrow-expand-horizontal" color={eidtorStore.showPaddingX ? theme.palette.primary.main : ''}/>
              </IconButton>
              <IconButton
                onClick = {()=>{
                  eidtorStore.setShowPaddingY(!eidtorStore.showPaddingY)
                }}
                >
                <MdiIcon iconClass="mdi-arrow-expand-vertical" color={eidtorStore.showPaddingY ? theme.palette.primary.main : ''}/>
              </IconButton>
              <IconButton 
                disabled = {eidtorStore.undoList.length === 0}
                onClick = {handleUndo}
              >
                <MdiIcon iconClass="mdi-undo"/>
              </IconButton>
              <IconButton disabled = {eidtorStore.redoList.length === 0}
                onClick = {handleRedo}
              >
                <MdiIcon iconClass="mdi-redo"/>
              </IconButton>
              <IconButton onClick = {handleClear}>
                <MdiIcon iconClass="mdi-delete-outline"/>
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
                disabled = {!dirty}
              >
                {intl.get('save')}
              </SubmitButton>
            </Fragment>
          }
        >
          {loading? <Container><PageSkeleton /></Container> :
            <Scrollbar permanent className={classes.scrollBar} onScroll ={handleScroll}>
              {eidtorStore.canvas&&
                <ComponentView 
                  node ={eidtorStore.canvas} 
                />
              }
              {
                eidtorStore.selectedNode &&
                <Fragment>
                  <ComponentLabel node={eidtorStore.selectedNode}/>
                  <NodeToolbar 
                    onBeginDrag = {handleBeginDrag}
                    onRemove = {handleRemove}
                    onSelectParent = {handleSelectParent}
                    onDuplicate = {handleDupliate}
                  />
                </Fragment>
              }
              {
                eidtorStore.activeNode &&
                <ComponentLabel node={eidtorStore.activeNode}/>
              }
            </Scrollbar>
          }
        </DesignerLayout>
        <Fragment>
          {
            (eidtorStore.draggedToolboxItem || eidtorStore.draggedNode) &&
            <MouseFollower label={ draggedLabel || 'unknow'} />
          }
          {
            (eidtorStore.draggedToolboxItem || eidtorStore.draggedNode) &&
            <DragCusor/>
          }
        </Fragment>      
      </Backdrop>
    </PageEditorStoreProvider>
  );
})