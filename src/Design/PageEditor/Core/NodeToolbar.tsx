import React, { useEffect, Fragment } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import MdiIcon from 'Components/Common/MdiIcon';
import classNames from 'classnames';
import { useLeftDrawer } from 'Store/Helpers/useAppStore';
import {observer} from 'mobx-react';
import { useDesign } from '../useDesign';

const height = 28;
const barWidth = height*4;

declare var window:{ 
  addEventListener:any,
  removeEventListener:any,
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      position:'fixed',
      background:theme.palette.primary.main,
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
export const NodeToolbar = observer((
  props:{
    onBeginDrag:()=>void,
    onRemove:()=>void,
    onSelectParent:()=>void,
    onDuplicate:()=>void,
  }
)=>{
  const {onBeginDrag, onRemove, onSelectParent, onDuplicate} = props;
  const iconSize = 16;
  const classes = useStyles();
  const [left, setLeft] = React.useState(0);
  const [top, setTop] = React.useState(0);

  const sidebar = useLeftDrawer() 
  
  const sideBarWidth = sidebar.width;
  
  const {canvasStore} = useDesign();

  const doFollow = ()=>{
    let rect = canvasStore?.selectedNode?.dom?.getBoundingClientRect();
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

  useEffect(() => {
    doFollow();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[canvasStore?.showPaddingX, canvasStore?.showPaddingY, canvasStore?.selectedNode?.dom, canvasStore?.scrollFlag]);


  useEffect(() => {
    window.addEventListener('resize', doFollow)
    window.addEventListener('scroll', doFollow)
    return () => {
      window.removeEventListener('resize', doFollow)
      window.removeEventListener('scroll', doFollow)
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <Fragment>
      {canvasStore?.selectedNode?.dom && 
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
})
