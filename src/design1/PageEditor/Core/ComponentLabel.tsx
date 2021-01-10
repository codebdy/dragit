import React, { useEffect, Fragment } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { observer} from 'mobx-react-lite';
import { IMeta } from 'base1/Model/IMeta';
import { RXNode } from 'base1/RXNode/RXNode';
import { useDesign } from '../useDesign';

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
export const ComponentLabel = observer((
  props:{
    node?:RXNode<IMeta>,
    followDom?:HTMLElement,
  }
)=>{
  const{node, followDom} = props;
  const classes = useStyles();
  const [left, setLeft] = React.useState(0);
  const [top, setTop] = React.useState(0);
  const {canvasStore} = useDesign();
  
  const doFollow = ()=>{
    let rect = followDom?.getBoundingClientRect();
    if(rect){
      setLeft(rect.x)
      let top = rect.y < 90 ? rect.y + rect.height : rect.y - 20
      setTop(top)
    }
  }

  useEffect(()=>{
    doFollow();
    window.addEventListener('resize', doFollow)
    return () => {
      window.removeEventListener('resize', doFollow)
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(() => {
    doFollow();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[canvasStore?.showPaddingX, canvasStore?.showPaddingY, followDom, canvasStore?.scrollFlag]);

  return (
    <Fragment>
      {followDom &&
        <div className={classes.label}
          style={{
            left:left + 'px',
            top: top + 'px',
          }}
        >
          {node?.meta.name}
        </div>
      }

    </Fragment>
  )
})
