import React, { useEffect, Fragment } from 'react';
import { observer} from 'mobx-react';
import { IMeta } from 'Base/RXNode/IMeta';
import { RxNode } from 'rx-drag/models/RxNode';
import { useDesign } from '../store/useDesign';

export const ComponentLabel = observer((
  props:{
    node?:RxNode<IMeta>,
    followDom:Element|null,
  }
)=>{
  const{node, followDom} = props;
  const [left, setLeft] = React.useState(0);
  const [top, setTop] = React.useState(0);
  const {rxDragStore} = useDesign();
  
  const doFollow = ()=>{
    let rect = followDom?.getBoundingClientRect();
    const canvasRect = rxDragStore?.canvas?.dom?.getBoundingClientRect();
    const canvasTop = (canvasRect?.top || 90) + 20;
    if(rect){
      setLeft(rect.x)
      let top = rect.y < canvasTop ? rect.y + rect.height : rect.y - 20
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
  },[rxDragStore?.showPaddingX, rxDragStore?.showPaddingY, followDom, rxDragStore?.refreshToolbarAndLabelFlag]);

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
