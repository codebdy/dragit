import React, { useEffect, Fragment } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { INode } from '../Node/INode';
import bus, { FOCUS_NODE, UN_FOCUS_NODE, CANVAS_SCROLL } from '../bus';
import MdiIcon from 'components/common/MdiIcon';
import { sideBarSettings } from 'utils';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import classNames from 'classnames';

const height = 28;
declare var window: any;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      position:'fixed',
      background:'#5d78ff',
      color:'#fff',
      fontSize:'0.8rem',
      height:height + 'px',
      lineHeight:height + 'px',
      width: (height * 5) + 'px',
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

export default function NodeToolbar(){
  const iconSize = 16;
  const classes = useStyles();
  const [following, setFollowing] = React.useState<INode|undefined>(undefined);
  const [left, setLeft] = React.useState(0);
  const [top, setTop] = React.useState(0);

  const selectSidebar = (state: RootState) => state.sidebar
  const sidebar = useSelector(selectSidebar)  
  
  const sideBarWidth = sideBarSettings.sizes[sidebar.size]

  const doFollow = (node?:INode)=>{
    let domElement = node?.view?.getDom();
    if(!domElement){
      return 
    }
    let rect = domElement.getBoundingClientRect();
    let left = rect.right - height * 5;
    left = left < sideBarWidth ? sideBarWidth : left;
    setLeft(left)
    let top = rect.y < 80 ? rect.y + rect.height : rect.y - 28;
    setTop(top);
  }

  const follow = (node:INode)=>{
    setFollowing(node);
    doFollow(node);
  }

  const unFollow = (node:INode)=>{
    if(following && following.id === node.id){
      setFollowing(undefined)
    }
  }

  const hangdePositionChange = ()=>{
    doFollow(following);
  }

  useEffect(() => {
    bus.on(FOCUS_NODE, follow);
    bus.on(UN_FOCUS_NODE, unFollow);
    document.addEventListener('mouseup', handleMouseUp);
    bus.on(CANVAS_SCROLL, hangdePositionChange);
    window.addEventListener('resize', hangdePositionChange)
    return () => {
      bus.off(FOCUS_NODE, follow)
      bus.off(UN_FOCUS_NODE, unFollow)
      document.removeEventListener('mouseup', handleMouseUp)
      bus.off(CANVAS_SCROLL, hangdePositionChange);
      window.removeEventListener('resize', hangdePositionChange)
    };
  });

  const handleToParent=(event:any)=>{
    following?.parent?.toFocusState();
    event.stopPropagation()
  };

  const handleBeginDrag=()=>{
    window.draggedNode = following;
    following?.toDraggedState();
  }

  const handleRemove = ()=>{
    following?.toNormalState();
    following?.removeFormParent();
  }

  const handleMouseUp=()=>{
    if(window.draggedNode?.parent){
      window.draggedNode?.toFocusState();      
    }
    else{
      window.draggedNode?.toNormalState();
    }

    window.draggedNode = null;
  }

  return (
    <Fragment>
      {!!following && 
        <div className={classes.toolbar}
          style={{
            left:left + 'px',
            top: top + 'px',
          }}
        >
          <div 
            className={classes.button}
            onClick = {handleToParent}
          >
            <MdiIcon iconClass='mdi-arrow-up' size={iconSize} />
          </div>
          <div 
            className={ classNames(classes.button, classes.move) }
            onMouseDown = {handleBeginDrag}
          >
            <MdiIcon iconClass='mdi-arrow-all' size={iconSize} />
          </div>
          <div className={classes.button}>
            <MdiIcon iconClass='mdi-square-edit-outline' size={iconSize} />
          </div>
          <div className={classes.button}>
            <MdiIcon iconClass='mdi-content-copy' size={14} />
          </div>
          <div className={classes.button}
            onClick={ handleRemove }
          >
            <MdiIcon iconClass='mdi-delete-outline' size={iconSize} />
          </div>
        </div>
      }

    </Fragment>
  )
}
