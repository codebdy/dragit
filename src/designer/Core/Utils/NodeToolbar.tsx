import React, { useEffect, Fragment } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { IContext } from '../Node/IContext';
import bus, { FOCUS_NODE, UN_FOCUS_NODE, FOCUS_IT } from '../bus';
import MdiIcon from 'components/common/MdiIcon';

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
    },

    button:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      width:height + 'px',
      "&:hover ":{
        background:'rgba(255, 255, 255, 0.1)',
      }
    }

  }),
);

export default function NodeToolbar(){
  const iconSize = 16;
  const classes = useStyles();
  const [following, setFollowing] = React.useState<IContext|null>(null);
  const [left, setLeft] = React.useState(0);
  const [top, setTop] = React.useState(0);

  const doFollow = (node:IContext)=>{
    let domElement = node.view.dom()
    let rect = domElement.getBoundingClientRect()
    setLeft(rect.right - height * 5)
    let top = rect.y < 80 ? rect.y + rect.height : rect.y - 28
    setTop(top)
  }

  const follow = (node:IContext)=>{
    setFollowing(node);
    doFollow(node);
  }

  const unFollow = (node:IContext)=>{
    if(following && following.schema.id === node.schema.id){
      setFollowing(null)
    }
  }

  useEffect(() => {
    bus.on(FOCUS_NODE, follow);
    bus.on(UN_FOCUS_NODE, unFollow);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      bus.off(FOCUS_NODE, follow)
      bus.off(UN_FOCUS_NODE, unFollow)
      document.removeEventListener('mouseup', handleMouseUp)
    };
  });

  const handleToParent=(event:any)=>{
    bus.emit(FOCUS_IT, following?.schema.parent?.id);
    //following?.parent?.toFocusState();
    event.stopPropagation()
  };

  const handleBeginDrag=()=>{
    window.draggedNode = following;
    following?.toDraggedState();
  }

  const handleMouseUp=()=>{
    window.draggedNode?.toFocusState();
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
            className={classes.button}
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
          <div className={classes.button}>
            <MdiIcon iconClass='mdi-delete-outline' size={iconSize} />
          </div>
        </div>
      }

    </Fragment>
  )
}
