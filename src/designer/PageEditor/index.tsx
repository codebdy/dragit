import React, { Fragment, useEffect, useState } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, Container, IconButton, useTheme } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import intl from 'react-intl-universal';
import Scrollbar from 'admin/common/Scrollbar';
import Spacer from 'components/common/Spacer';
import { showOutlineActon, showPaddingXActon, showPaddingYActon } from 'store/designer/actions';
import MdiIcon from 'components/common/MdiIcon';
import bus from '../../base/bus';
import { CANVAS_SCROLL, REFRESH_NODE, SELECT_NODE } from "./Core/busEvents";
import MouseFollower from './Core/MouseFollower';
import DesignerLayout from 'designer/Layout';
import LeftContent from './LeftContent';
import useDesigner from 'store/designer/useDesigner';
import { API_GET_PAGE, API_UPDATE_PAGE } from 'APIs/modules';
import { useAxios } from 'base/Hooks/useAxios';
import { IPage, IPageSchema } from 'base/Model/IPage';
import { AxiosRequestConfig } from 'axios';
import PageSkeleton from 'admin/views/Page/PageSkeleton';
import { useAuthCheck } from 'base/Hooks/useAuthCheck';
import { IMeta } from 'base/Model/IMeta';
import { RXNodeRoot } from 'base/RXNode/Root';
import ComponentView from './Core/ComponentView';
import { RXNode } from 'base/RXNode/RXNode';
import NodeToolbar from './Core/NodeToolbar';
import { IToolboxItem } from './Toolbox/IToolboxItem';
import DragCusor from './Core/DragCusor';
import { CursorPosition, IDragOverParam } from './Core/IDragOverParam';
import SelectedLabel from './Core/SelectedLabel';
import { cloneObject } from '../../utils/cloneObject';
import SubmitButton from 'components/common/SubmitButton';
import { clearPageSchemaCache } from 'base/Hooks/usePageMeta';
import ConfirmDialog from 'base/Widgets/ConfirmDialog';

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
  return new RXNodeRoot<IMeta>(
    {
      name:'Canvas'
    }
  )
}

interface Snapshot{
  canvasNode:RXNodeRoot<IMeta>;
  selectedNodeId?:number;
}

declare var window:{
  dragOverParam?:IDragOverParam,
  draggedNode?:RXNode<IMeta>,
  canvas:RXNodeRoot<IMeta>,
  draggedToolboxItem?:IToolboxItem,
  selectedNode?:RXNode<IMeta>,
  undoList:Array<Snapshot>,
};

export default function PageEditor(
  props:{
    pageSlug:string,
    onClose:()=>void
  }
) {
  const {pageSlug, onClose} = props;
  const classes = useStyles();
  const designer = useDesigner();
  const {showOutline, showPaddingX, showPaddingY} = designer;
  const [pageRequest, setPageRequest] = useState<AxiosRequestConfig>();
  const [pageMeta, loading] = useAxios<IPage>(pageRequest);
  const [pageSchema, setPageSchema] = useState<IPageSchema|undefined>(pageMeta?.jsonSchema);
  const [metas, setMetas] = useState<Array<IMeta>>([])
  const [canvas, setCanvas] = useState<RXNodeRoot<IMeta>>(makeCanvas());
  const [selectedNode, setSelectedNode] = useState<RXNode<IMeta>>();
  const [undoList, setUndoList] = useState<Array<Snapshot>>([]);
  const [redoList, setRedoList] = useState<Array<Snapshot>>([]);
  const [draggedToolboxItem, setDraggedToolboxItem] = useState<IToolboxItem>();
  const [draggedNode, setDraggedNode] = useState<RXNode<IMeta>>();
  const [saveRequest, setSaveRequest] = useState<AxiosRequestConfig>();
  const [, saving] = useAxios(saveRequest, true);
  const [isDirty, setIsDirty] = useState(false);
  const [saveConfirmOpen, setSaveConfirmOpen] = useState(false);

  const dispatch = useDispatch()
  const theme = useTheme(); 
  useAuthCheck();
  useEffect(()=>{
    if(undoList.length > 0 && (redoList.length !== 0 || undoList.length !== 0)){
      setIsDirty(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[undoList])  
  
  const operateNode = (targetNode:RXNode<IMeta>, draggedNode:RXNode<IMeta>, position:CursorPosition)=>{
    if(targetNode.id === draggedNode.id){
      return false;
    }
    if(position === 'in-bottom' || position === 'in-right' || position === 'in-center'){
      draggedNode.moveIn(targetNode);
      return true;        
    }
    if(position === 'in-top' || position === 'in-left'){
      draggedNode.moveInTop(targetNode);
      return true;  
    }
    if(position === 'out-bottom' || position === 'out-right'){
      draggedNode.moveAfter(targetNode);
      return true;  
    }
    if(position === 'out-top' || position === 'out-left'){
      draggedNode.moveBefore(targetNode);
      return true;  
    }
    return false;  
  }

  useEffect(()=>{
    window.canvas = canvas;
    window.draggedNode = draggedNode;
    window.draggedToolboxItem = draggedToolboxItem;
    window.selectedNode = selectedNode;
    window.undoList = undoList;
  },[draggedNode, canvas, draggedToolboxItem, selectedNode, undoList])

  const handleMouseUp = ()=>{
    if(window.dragOverParam && (window.draggedToolboxItem || window.draggedNode)){
      let targetNode = window?.dragOverParam?.targetNode;
      let dragNode = window.draggedNode;
      if(!dragNode && window.draggedToolboxItem?.meta){
        dragNode = RXNode.make<IMeta>(cloneObject(window.draggedToolboxItem?.meta));
      }
      if(dragNode && targetNode) {
        backupToUndoList(dragNode.id); 
        let dragParentId = dragNode.parent?.id;
        let targetParentId = targetNode.parent?.id;
        if(!operateNode(targetNode, dragNode, window.dragOverParam.position)){
          window.undoList.pop();
          setUndoList([...window.undoList]);
        }
        setSelectedNode(dragNode);
        bus.emit(REFRESH_NODE, dragParentId);
        bus.emit(REFRESH_NODE, targetParentId);
        bus.emit(REFRESH_NODE, targetNode.id);
        bus.emit(REFRESH_NODE, dragNode.id);
      }
    }
    window.dragOverParam = undefined;
    setDraggedNode(undefined);
    setDraggedToolboxItem(undefined);
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
    setPageRequest({...API_GET_PAGE, params:{pageSlug}})
  },[pageSlug]);

  useEffect(() => {
    setPageSchema(pageMeta?.jsonSchema);
    //相当于复制一个Json副本，不保存的话直接扔掉
    setMetas(cloneObject(pageMeta?.jsonSchema?.layout || []));
  },[pageMeta]);
 
  useEffect(()=>{
    let newCanvas = makeCanvas();
    newCanvas.parse(metas);
    setCanvas(newCanvas);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[metas])

  useEffect(()=>{
    bus.emit(SELECT_NODE, selectedNode);
  }, [selectedNode])

  const handleCancel = () => {
    if(isDirty){
      setSaveConfirmOpen(true);
    }
  };

  const handleSave = () => {
    setSaveRequest({...API_UPDATE_PAGE, 
      data:{
        page:{
          ...pageMeta,
          jsonSchema:{
            ...pageSchema,
            layout:canvas.getRootMetas(),
          },
        }
      }
    })
    clearPageSchemaCache();
    setIsDirty(false);    
  };

  const handleBackConfirm = ()=>{
    setSaveConfirmOpen(false);
    onClose();
  }

  const handleScroll = ()=>{
    bus.emit(CANVAS_SCROLL)
  }

  const handleStartDragMetas = (item:IToolboxItem)=>{
    setDraggedToolboxItem(item);
    setSelectedNode(undefined);
    document.body.classList.add('can-not-be-selected');
  }

  const backupToUndoList = (operateId:number|undefined) => {
    setUndoList([...window.undoList,
    {
      canvasNode: window.canvas.copy(),
      selectedNodeId: window.selectedNode?.id || operateId,
    }
    ]);
  }

  const handlePropChange = (propName:string, value:any)=>{
    if(selectedNode){
      backupToUndoList(selectedNode.id);        
      selectedNode.meta.props = selectedNode.meta.props || {};
      selectedNode.meta.props[propName] = value;
      setSelectedNode(selectedNode);
      setRedoList([]);
      bus.emit(REFRESH_NODE, selectedNode.id);
    }
  }

  const handlPageChange = (page:IPageSchema)=>{
    setPageSchema(page)
  }

  const handleSelectedNode = (node?:RXNode<IMeta>)=>{
    setSelectedNode(node);
  }

  const handleUndo = ()=>{
    let cmd = undoList.pop();
    if(cmd){
      setUndoList([...undoList]);
      setRedoList([...redoList, 
        {
          canvasNode:canvas.copy(),
          selectedNodeId: cmd.selectedNodeId,
        }
      ]);
      setCanvas(cmd.canvasNode);
      setSelectedNode(cmd.canvasNode.getNode(cmd.selectedNodeId));    
    }
  }

  const handleRedo = ()=>{
    let cmd = redoList.pop();
    if(cmd){
      setUndoList([...undoList, 
        {
          canvasNode:canvas.copy(),
          selectedNodeId: cmd.selectedNodeId,
        }
      ]);
      setRedoList([...redoList]);
      setCanvas(cmd.canvasNode); 
      setSelectedNode(cmd.canvasNode.getNode(cmd.selectedNodeId));  
    }    
  }

  const handleClear = ()=>{
    backupToUndoList(undefined);    
    canvas.children = [];
    bus.emit(REFRESH_NODE, canvas.id);      
    setSelectedNode(undefined);
    setRedoList([]);
  }

  
  const handleBeginDrag = ()=>{
    setDraggedNode(selectedNode);
    setSelectedNode(undefined);
    document.body.classList.add('can-not-be-selected')
  }

  const handleRemove = ()=>{
    if(selectedNode){
      backupToUndoList(undefined);
      let parentId = selectedNode.parent?.id;
      selectedNode.remove();
      setSelectedNode(undefined);
      setRedoList([]);
      bus.emit(REFRESH_NODE, parentId);
    }
  }

  const handleDupliate = ()=>{
    if(selectedNode){
      backupToUndoList(undefined);      
      let newNode = selectedNode.duplicate();
      setSelectedNode(newNode);
      setRedoList([]);
      bus.emit(REFRESH_NODE, selectedNode.parent?.id);
    }
  }

  const handleSelectParent = ()=>{
    setSelectedNode(selectedNode?.parent);
  }

  let draggedLabel = draggedToolboxItem ?draggedToolboxItem?.title || intl.get(draggedToolboxItem?.titleKey||'') : draggedNode?.meta.name;

  return (
    loading? <Container><PageSkeleton /></Container> :
      <Backdrop className={classes.backdrop} open={true}>        
        <DesignerLayout
          leftArea = {
            <LeftContent 
              pageSchema={pageSchema} 
              selectedNode = {selectedNode}
              onPropChange = {handlePropChange}
              onSettingsChange={handlPageChange}
              onStartDragToolboxItem = {handleStartDragMetas}
            />
          }

          toolbar = {
            <Fragment>
              <IconButton 
                onClick = {()=>{
                  dispatch(showOutlineActon(!showOutline))
                }}
              >
                <MdiIcon iconClass="mdi-border-none-variant" color={showOutline ? theme.palette.primary.main : ''}/>
              </IconButton>
              <IconButton
                onClick = {()=>{
                  dispatch(showPaddingXActon(!showPaddingX))
                }}
              >
                <MdiIcon iconClass="mdi-arrow-expand-horizontal" color={showPaddingX ? theme.palette.primary.main : ''}/>
              </IconButton>
              <IconButton
                onClick = {()=>{
                  dispatch(showPaddingYActon(!showPaddingY))
                }}
                >
                <MdiIcon iconClass="mdi-arrow-expand-vertical" color={showPaddingY ? theme.palette.primary.main : ''}/>
              </IconButton>
              <IconButton 
                disabled = {undoList.length === 0}
                onClick = {handleUndo}
              >
                <MdiIcon iconClass="mdi-undo"/>
              </IconButton>
              <IconButton disabled = {redoList.length === 0}
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
                disabled = {!isDirty}
              >
                {intl.get('save')}
              </SubmitButton>
            </Fragment>
          }
        >
          <Scrollbar permanent className={classes.scrollBar} onScroll ={handleScroll}>
            <ComponentView 
              key={canvas.id} 
              node ={canvas} 
              selectedNode = {selectedNode} 
              onSelectNode = {handleSelectedNode}
              draggedToolboxItem = {draggedToolboxItem}
              draggedNode = {draggedNode}
            />
            {
              selectedNode &&
              <Fragment>
                <SelectedLabel label = {selectedNode.meta.name} />
                <NodeToolbar 
                  onBeginDrag = {handleBeginDrag}
                  onRemove = {handleRemove}
                  onSelectParent = {handleSelectParent}
                  onDuplicate = {handleDupliate}
                />
              </Fragment>
            }

          </Scrollbar>
        </DesignerLayout>
        <Fragment>
          {
            (draggedToolboxItem || draggedNode) &&
            <MouseFollower label={ draggedLabel || 'unknow'} />
          }
          {
            (draggedToolboxItem || draggedNode) &&
            <DragCusor/>
          }
          <ConfirmDialog 
            message = {intl.get('changing-not-save-message')}
            open = {saveConfirmOpen}
            onCancel ={()=>{setSaveConfirmOpen(false)}}
            onConfirm = {handleBackConfirm}
          />
        </Fragment>      
      </Backdrop>
  );
}