import React, { useEffect, Fragment } from 'react';
import { observer} from 'mobx-react';
import { IMeta } from 'Base/RXNode/IMeta';
import { RxNode } from 'rx-drag/RxNode';
import { useDesign } from '../context/useDesign';

export const ComponentLabel = observer((
  props:{
    node?:RxNode<IMeta>,
    followDom:Element|null,
  }
)=>{
  const{node, followDom} = props;
  const [left, setLeft] = React.useState(0);
  const [top, setTop] = React.useState(0);
  const {rxDragCoreStore: editorStore} = useDesign();
  
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
  },[editorStore?.showPaddingX, editorStore?.showPaddingY, followDom, editorStore?.refreshToolbarAndLabelFlag]);

  return (
    <Fragment>
      {followDom &&
        <div className={'rx-label'}
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
