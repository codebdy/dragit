import React, { useEffect, Fragment } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import bus from '../../../base/bus';
import { CANVAS_SCROLL, REFRESH_SELECT_STATE } from "./busEvents";
import { observer} from 'mobx-react-lite';
import { useCanvarsStore } from '../CanvasStore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
      position:'fixed',
      background:theme.palette.primary.main,
      color:'#fff',
      padding:' 0 5px',
      fontSize:'0.8rem',
      height:'20px',
      lineHeight:'20px',
      userSelect:'none',
      cursor: 'default',
      pointerEvents: 'none',
    },

  }),
);
export const SelectedLabel = observer((
  props:{
    label:string,
  }
)=>{
  const{label} = props;
  const classes = useStyles();
  const [left, setLeft] = React.useState(0);
  const [top, setTop] = React.useState(0);
  const canvasStore = useCanvarsStore();
  
  const doFollow = ()=>{
    let rect = canvasStore.selectedNode?.dom?.getBoundingClientRect();
    if(rect){
      setLeft(rect.x)
      let top = rect.y < 90 ? rect.y + rect.height : rect.y - 20
      setTop(top)
    }
  }

  useEffect(()=>{
    doFollow();
    bus.on(CANVAS_SCROLL, doFollow);
    bus.on(REFRESH_SELECT_STATE, doFollow);
    window.addEventListener('resize', doFollow)
    return () => {
      bus.off(CANVAS_SCROLL, doFollow);
      bus.off(REFRESH_SELECT_STATE, doFollow);
      window.removeEventListener('resize', doFollow)
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(() => {
    doFollow();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[canvasStore.showPaddingX, canvasStore.showPaddingY]);

  return (
    <Fragment>
      {canvasStore.selectedNode?.dom &&
        <div className={classes.label}
          style={{
            left:left + 'px',
            top: top + 'px',
          }}
        >
          {label}
        </div>
      }

    </Fragment>
  )
})
