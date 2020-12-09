import React, { useEffect, Fragment } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import bus from '../../../base/bus';
import { CANVAS_SCROLL, SELECT_NODE } from "./busEvents";
import MdiIcon from 'components/common/MdiIcon';
import { sideBarSettings } from 'utils/sideBarSettings';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import classNames from 'classnames';
import { IMeta } from 'base/Model/IMeta';
import { RXNode } from 'base/RXNode/RXNode';

const height = 28;
const barWidth = height*4;

declare var window:{ 
  selectedNode?:RXNode<IMeta>,
  addEventListener:any,
  removeEventListener:any,
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      position:'fixed',
      background:'#5d78ff',
      color:'#fff',
      fontSize:'0.8rem',
      height:height + 'px',
      lineHeight:height + 'px',
      width: barWidth + 'px',
      display: 'flex',
      flexFlow: 'row',
      alignItems:'strech',
      //zIndex:theme.zIndex.drawer + 2,
    },

    button:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      width:height + 'px',
      "&:hover ":{
        background:'rgba(255, 255, 255, 0.1)',
      }
    },

    move:{
      //cursor:'move',
    },

  }),
);
export default function NodeToolbar(
  props:{
    onBeginDrag:()=>void,
    onRemove:()=>void,
    onSelectParent:()=>void,
    onDuplicate:()=>void,
  }
){
  const {onBeginDrag, onRemove, onSelectParent, onDuplicate} = props;
  const iconSize = 16;
  const classes = useStyles();
  const [left, setLeft] = React.useState(0);
  const [top, setTop] = React.useState(0);

  const selectSidebar = (state: RootState) => state.sidebar
  const sidebar = useSelector(selectSidebar)  
  
  const sideBarWidth = sideBarSettings.sizes[sidebar.size]
  
  const selectMyStore = (state: RootState) => state.designer
  const myStore = useSelector(selectMyStore)

  const doFollow = ()=>{
    let rect = window.selectedNode?.dom?.getBoundingClientRect();
    if(!rect){
      return 
    }
    //let rect = followDom.getBoundingClientRect();
    let left = rect.x + rect.width - barWidth;
    left = left < sideBarWidth ? sideBarWidth : left;
    left = left + barWidth > document.body.clientWidth ? document.body.clientWidth - barWidth : left;
    setLeft(left)
    let top = rect.y < 90 ? rect.y + rect.height : rect.y - 28;
    setTop(top);
  }

  const hangdePositionChange = ()=>{
    doFollow();
  }


  const handleSelect = (selectedNode:RXNode<IMeta>)=>{
    doFollow();
  }

  useEffect(() => {
    bus.on(CANVAS_SCROLL, hangdePositionChange);
    bus.on(SELECT_NODE, handleSelect);
    window.addEventListener('resize', hangdePositionChange)
    return () => {
      bus.off(CANVAS_SCROLL, hangdePositionChange);
      bus.off(SELECT_NODE, handleSelect);
      window.removeEventListener('resize', hangdePositionChange)
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(() => {
    hangdePositionChange();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[myStore.showPaddingX, myStore.showPaddingY]);


  return (
    <Fragment>
      {window.selectedNode?.dom && 
        <div className={classes.toolbar}
          style={{
            left:left + 'px',
            top: top + 'px',
          }}
        >
          <div 
            className={classes.button}
            onClick = {onSelectParent}
          >
            <MdiIcon iconClass='mdi-arrow-up' size={iconSize} />
          </div>
          <div 
            className={ classNames(classes.button, classes.move) }
            onMouseDown = {onBeginDrag}
          >
            <MdiIcon iconClass='mdi-arrow-all' size={iconSize} />
          </div>
          <div className={classes.button}
            onClick = {onDuplicate}
          >
            <MdiIcon iconClass='mdi-content-copy' size={14} />
          </div>
          <div className={classes.button}
            onClick={ onRemove }
          >
            <MdiIcon iconClass='mdi-delete-outline' size={iconSize} />
          </div>
        </div>
      }

    </Fragment>
  )
}
