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
import bus, { CANVAS_SCROLL } from './Core/bus';
import MouseFollower from './Core/Utils/MouseFollower';
import DesignerLayout from 'designer/Layout';
import LeftContent from './LeftContent';
import useDesigner from 'store/designer/useDesigner';
import { API_GET_PAGE } from 'APIs/modules';
import { useAxios } from 'base/Hooks/useAxios';
import { IPage, IPageSchema } from 'base/Model/IPage';
import { AxiosRequestConfig } from 'axios';
import PageSkeleton from 'admin/views/Page/PageSkeleton';
import { useAuthCheck } from 'base/Hooks/useAuthCheck';
import DragRXEditor from './Core/DragRXEditor';

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

  //相当于复制一个Json副本，不保存的话直接扔掉
  let nodes = JSON.parse(JSON.stringify(pageMeta?.jsonSchema?.layout || []));
  //let canvas = new CanvasNode(nodes);
  useAuthCheck();
  
  useEffect(() => {
    setPageRequest({...API_GET_PAGE, params:{pageSlug}})
  },[pageSlug]);

  useEffect(() => {
    setPageSchema(pageMeta?.jsonSchema)
  },[pageMeta]);
 
  const dispatch = useDispatch()
  const theme = useTheme();
  
  const handleCancel = () => {
    onClose();

  };

  const handleSave = () => {
    onClose();
  };

  const handleScroll = ()=>{
    bus.emit(CANVAS_SCROLL)
  }

  const handlPageChange = (page:IPageSchema)=>{
    setPageSchema(page)
  }

  return (
    loading? <Container><PageSkeleton /></Container> :
      <Backdrop className={classes.backdrop} open={true}>        
        <DesignerLayout
          leftArea = {
            <LeftContent pageSchema={pageSchema} onChange={handlPageChange}/>
          }

          toolbar = {
            <Fragment>
              <IconButton>
                <MdiIcon iconClass="mdi-layers-outline"/>
              </IconButton>
              {//<IconButton>
              // <MdiIcon iconClass="mdi-dock-bottom"/>
                //</IconButton>
              }
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
              <IconButton>
                <MdiIcon iconClass="mdi-undo"/>
              </IconButton>
              <IconButton>
                <MdiIcon iconClass="mdi-redo"/>
              </IconButton>
              <IconButton>
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
            <DragRXEditor metas ={nodes}/>
          </Scrollbar>
        </DesignerLayout>
        <Fragment>
          <MouseFollower />
        </Fragment>      
      </Backdrop>
  );
}