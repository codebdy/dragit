import React, { useEffect, Fragment } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import bus, { CANVAS_SCROLL } from '../bus';
import useDesigner from 'store/designer/useDesigner';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
      position:'fixed',
      background:'#5d78ff',
      color:'#fff',
      padding:' 0 5px',
      fontSize:'0.8rem',
      height:'20px',
      lineHeight:'20px',
      userSelect:'none',
      cursor: 'default',
    },

  }),
);

export default function Label(
  props:{
    followDom:HTMLElement|null|undefined, 
    label:string,
  }
){
  const{followDom, label} = props;
  const classes = useStyles();
  const [left, setLeft] = React.useState(0);
  const [top, setTop] = React.useState(0);
  const designer = useDesigner();
  
  let rect = followDom?.getBoundingClientRect()  
  const doFollow = ()=>{
    if(rect){

      setLeft(rect.x)
      let top = rect.y < 90 ? rect.y + rect.height : rect.y - 20
      setTop(top)
    }
  }

  useEffect(()=>{
    doFollow()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[rect])

  
  const hangdePositionChange = ()=>{
    doFollow();
  }

  useEffect(() => {
      bus.on(CANVAS_SCROLL, hangdePositionChange);
      window.addEventListener('resize', hangdePositionChange)
    return () => {
      bus.off(CANVAS_SCROLL, hangdePositionChange);
      window.removeEventListener('resize', hangdePositionChange)
     };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    hangdePositionChange();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[designer.showPaddingX, designer.showPaddingY]);

  return (
    <Fragment>
      {followDom &&
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
}
