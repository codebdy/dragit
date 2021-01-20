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
  


  const handleMouseUp = ()=>{
    if(eidtorStore.dragOverParam && (eidtorStore.draggedToolboxItem || eidtorStore.draggedNode)){
      let targetNode = eidtorStore.dragOverParam?.targetNode;
      let dragNode = eidtorStore.draggedNode;
      if(!dragNode && eidtorStore.draggedToolboxItem?.meta){
        dragNode = RXNode.make<IMeta>(cloneObject(eidtorStore.draggedToolboxItem?.meta));
      }
      if(dragNode && targetNode) {
        eidtorStore?.operateNode(dragNode, targetNode, eidtorStore.dragOverParam.position);
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
    eidtorStore.clear();
  }

  
  const handleBeginDrag = ()=>{
    eidtorStore.setDraggedNode(eidtorStore.selectedNode);
    eidtorStore.setSelectedNode(undefined);
    document.body.classList.add('can-not-be-selected')
  }

  const handleRemove = ()=>{
    if(eidtorStore.selectedNode){
      eidtorStore.excuteCommand(new RemoveCommand(eidtorStore.selectedNode))
    }
  }

  const handleDupliate = ()=>{
    if(eidtorStore.selectedNode){
      eidtorStore.excuteCommand(new DuplicateCommand(eidtorStore.selectedNode))
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
                  <ComponentLabel 
                    node={eidtorStore.selectedNode}
                    followDom = {eidtorStore.selectedDom}
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
                eidtorStore.activeNode &&
                <ComponentLabel 
                  node={eidtorStore.activeNode}
                  followDom = {eidtorStore.activeNode.dom}
                />
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