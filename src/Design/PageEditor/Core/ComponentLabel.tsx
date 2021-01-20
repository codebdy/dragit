import React, { useEffect, Fragment } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { observer} from 'mobx-react';
import { IMeta } from 'Base/Model/IMeta';
import { RXNode } from 'Base/RXNode/RXNode';
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
    followDom:Element|null,
  }
)=>{
  const{node, followDom} = props;
  const classes = useStyles();
  const [left, setLeft] = React.useState(0);
  const [top, setTop] = React.useState(0);
  const {eidtorStore} = useDesign();
  
  const doFollow = ()=>{
    let rect = followDom?.getBoundingClientRect();
    if(rect){
      setLeft(rect.x)
      let top = rect.y < 90 ? rect.y + rect.height : rect.y - 20
      setTop(top)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', doFollow)
    window.addEventListener('scroll', doFollow)
    return () => {
      window.removeEventListener('resize', doFollow)
      window.removeEventListener('scroll', doFollow)
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(() => {
    doFollow();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[eidtorStore?.showPaddingX, eidtorStore?.showPaddingY, followDom, eidtorStore?.scrollFlag]);

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
