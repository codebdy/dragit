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
import { CANVAS_SCROLL } from "./Core/busEvents";
import MouseFollower from './Core/MouseFollower';
import DesignerLayout from 'designer/Layout';
import LeftContent from './LeftContent';
import useDesigner from 'store/designer/useDesigner';
import { API_GET_PAGE } from 'APIs/modules';
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
import NodeLabel from './Core/NodeLabel';
import { IToolboxItem } from './Toolbox/IToolboxItem';
import DragCusor from './Core/DragCusor';
import { CursorPosition, IDragOverParam } from './Core/IDragOverParam';

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
  const [metas, seMetas] = useState<Array<IMeta>>([])
  const [canvas, setCanvas] = useState<RXNodeRoot<IMeta>>(makeCanvas());
  const [selectedNode, setSelectedNode] = useState<RXNode<IMeta>>();
  const [undoList, setUndoList] = useState<Array<Snapshot>>([]);
  const [redoList, setRedoList] = useState<Array<Snapshot>>([]);
  const [selectedDom, setSelectedDom] = useState<HTMLElement>();
  const [draggedToolboxItem, setDraggedToolboxItem] = useState<IToolboxItem>();
  const [draggedNode, setDraggedNode] = useState<RXNode<IMeta>>();

  const dispatch = useDispatch()
  const theme = useTheme(); 
  useAuthCheck();  
  
  const operateNode = (targetNode:RXNode<IMeta>, draggedNode:RXNode<IMeta>, position:CursorPosition)=>{
    if(position === 'in-bottom' || position === 'in-right' || position === 'in-center'){
      draggedNode.moveIn(targetNode);
    }
    if(position === 'in-top' || position === 'in-left'){
      draggedNode.moveInTop(targetNode);
    }
    if(position === 'out-bottom' || position === 'out-right'){
      draggedNode.moveAfter(targetNode);
    }
    if(position === 'out-top' || position === 'out-left'){
      draggedNode.moveBefore(targetNode);
    }
  }

  useEffect(()=>{
    window.canvas = canvas;
    window.draggedNode = draggedNode;
    window.draggedToolboxItem = draggedToolboxItem;
    window.selectedNode = selectedNode;
    window.undoList = undoList;
  },[draggedNode, canvas, draggedToolboxItem, selectedNode, undoList])

  const handleMouseUp = ()=>{
    if(window.dragOverParam && window.draggedToolboxItem){
      backupToUndoList();  
      let canvasCopy = window.canvas.copy();
      let targetNodeCopy = canvasCopy.getNode(window?.dragOverParam?.targetNode?.id);
      let dragNode = window.draggedNode;
      if(!dragNode && window.draggedToolboxItem?.meta){
        dragNode = RXNode.make<IMeta>(window.draggedToolboxItem?.meta);
      }else{
        dragNode = canvasCopy.getNode(window.draggedNode?.id);
      }
      if(dragNode && targetNodeCopy) {
        operateNode(targetNodeCopy, dragNode, window.dragOverParam.position);
        setSelectedNode(dragNode);
      }
      setCanvas(canvasCopy);
    }
    window.dragOverParam = undefined;
    setDraggedNode(undefined);
    setDraggedToolboxItem(undefined);
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
    seMetas(JSON.parse(JSON.stringify(pageMeta?.jsonSchema?.layout || [])))
  },[pageMeta]);
 
  useEffect(()=>{
    let newCanvas = makeCanvas();
    newCanvas.parse(metas);
    setCanvas(newCanvas);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[metas])

  const handleCancel = () => {
    onClose();
  };

  const handleSave = () => {
    onClose();
  };

  const handleScroll = ()=>{
    bus.emit(CANVAS_SCROLL)
  }

  const handleStartDragMetas = (item:IToolboxItem)=>{
    setDraggedToolboxItem(item);
    setSelectedNode(undefined);
  }

  const handleSelectNodeDom = (dom?:HTMLElement)=>{
    //console.log('dom',dom)
    setSelectedDom(dom);
  }

  const backupToUndoList = () => {
    setUndoList([...window.undoList,
    {
      canvasNode: window.canvas,
      selectedNodeId: window.selectedNode?.id,
    }
    ]);
  }

  const handlePropChange = (propName:string, value:any)=>{
    backupToUndoList();    
    let canvasCopy = canvas.copy();
    let selectNodeCopy = canvasCopy.getNode(selectedNode?.id)
    if(selectNodeCopy){
      selectNodeCopy.meta.props = selectNodeCopy.meta.props || {};
      selectNodeCopy.meta.props[propName] = value;
      setCanvas(canvasCopy);      
      setSelectedNode(selectNodeCopy);
      setRedoList([]);
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
          canvasNode:canvas,
          selectedNodeId: selectedNode?.id,
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
          canvasNode:canvas,
          selectedNodeId: selectedNode?.id,
        }
      ]);
      setRedoList([...redoList]);
      setCanvas(cmd.canvasNode);
      setSelectedNode(cmd.canvasNode.getNode(cmd.selectedNodeId));      
    }    
  }

  const handleClear = ()=>{
    backupToUndoList();    
    let newCanvas = makeCanvas();
    setCanvas(newCanvas);      
    setSelectedNode(undefined);
    setRedoList([]);
  }

  
  const handleBeginDrag = ()=>{

  }

  const handleRemove = ()=>{
    backupToUndoList();
    let canvasCopy = canvas.copy();
    let selectNodeCopy = canvasCopy.getNode(selectedNode?.id)
    if(selectNodeCopy){
      selectNodeCopy.remove();
      setCanvas(canvasCopy);      
      setSelectedNode(undefined);
      setRedoList([]);
    }
  }

  const handleDupliate = ()=>{
    backupToUndoList();
    let canvasCopy = canvas.copy();
    let selectNodeCopy = canvasCopy.getNode(selectedNode?.id)
    if(selectNodeCopy){
      let newNode = selectNodeCopy.duplicate();
      setCanvas(canvasCopy);      
      setSelectedNode(newNode);
      setRedoList([]);
    }
  }

  const handleSelectParent = ()=>{
    setSelectedNode(selectedNode?.parent);
  }

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
                {intl.get('cancel')}
              </Button>
              <Button variant="contained" color="primary" onClick={handleSave}>
              {intl.get('save')}
              </Button>
            </Fragment>
          }
        >
          <Scrollbar permanent className={classes.scrollBar} onScroll ={handleScroll}>
            <ComponentView 
              key={canvas.id} 
              node ={canvas} 
              selectedNode = {selectedNode} 
              onSelectNode = {handleSelectedNode}
              onSelectNodeDom = {handleSelectNodeDom}
              draggedToolboxItem = {draggedToolboxItem}
              //onLocateCursor = {handleLocateCuror}
            />
            {
              selectedNode &&
              <Fragment>
                <NodeLabel followDom = {selectedDom} label = {selectedNode.meta.name} />
                <NodeToolbar 
                  followDom = {selectedDom}
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
            draggedToolboxItem &&
            <MouseFollower label={draggedToolboxItem.title || intl.get(draggedToolboxItem.titleKey||'')} />
          }
          {
            draggedToolboxItem &&
            <DragCusor/>
          }
        </Fragment>      
      </Backdrop>
  );
}