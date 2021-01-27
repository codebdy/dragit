import React, { useEffect, Fragment } from 'react';
import {observer} from 'mobx-react';
import { useDesign } from '../store/useDesign';

const height = 28;
const barWidth = height*4;

declare var window:{ 
  addEventListener:any,
  removeEventListener:any,
};

var svgArrowUp = `
  <svg style="width:20px;height:20px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z" />
  </svg>
`

var svgMove = `
  <svg style="width:20px;height:20px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M13,11H18L16.5,9.5L17.92,8.08L21.84,12L17.92,15.92L16.5,14.5L18,13H13V18L14.5,16.5L15.92,17.92L12,21.84L8.08,17.92L9.5,16.5L11,18V13H6L7.5,14.5L6.08,15.92L2.16,12L6.08,8.08L7.5,9.5L6,11H11V6L9.5,7.5L8.08,6.08L12,2.16L15.92,6.08L14.5,7.5L13,6V11Z" />
  </svg>
`

var svgDuplicate = `
  <svg style="width:16px;height:16px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
  </svg>
`

var svgRemove = `
  <svg style="width:20px;height:20px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />
  </svg>
`

export const NodeToolbar = observer((
  props:{
    onBeginDrag:()=>void,
    onRemove:()=>void,
    onSelectParent:()=>void,
    onDuplicate:()=>void,
  }
)=>{
  const {onBeginDrag, onRemove, onSelectParent, onDuplicate} = props;

  const [left, setLeft] = React.useState(0);
  const [top, setTop] = React.useState(0);

  const {rxDragCoreStore} = useDesign();

  const doFollow = ()=>{
    const canvasRect = rxDragCoreStore?.canvas?.dom?.getBoundingClientRect();
    const rect =  rxDragCoreStore?.selectedDom?.getBoundingClientRect();
    const canvasLeft = canvasRect?.left || 0

    if(!rect){
      return 
    }
    //let rect = followDom.getBoundingClientRect();
    let left = rect.x + rect.width - barWidth;
    left = left < canvasLeft ? canvasLeft : left;
    left = left + barWidth > document.body.clientWidth ? document.body.clientWidth - barWidth : left;
    setLeft(left)
    let top = rect.y < 90 ? rect.y + rect.height : rect.y - 28;
    setTop(top);
  }

  useEffect(() => {
    doFollow();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[rxDragCoreStore?.showPaddingX, rxDragCoreStore?.showPaddingY, rxDragCoreStore?.selectedDom, rxDragCoreStore?.refreshToolbarAndLabelFlag]);


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
      {rxDragCoreStore?.selectedDom && 
        <div className= 'rx-node-toolbar'
          style={{
            left:left + 'px',
            top: top + 'px',
          }}
        >
          <div 
            className='rx-node-button'
            onClick = {onSelectParent}
            dangerouslySetInnerHTML = {{__html:svgArrowUp}}
            style = {{width: '24px'}}
          >
          </div>
          <div 
            className='rx-node-button'
            onMouseDown = {onBeginDrag}
            dangerouslySetInnerHTML = {{__html:svgMove}}
          >
          </div>
          <div className='rx-node-button'
            dangerouslySetInnerHTML = {{__html:svgDuplicate}}
            onClick = {onDuplicate}
          >
          </div>
          <div className='rx-node-button'
          dangerouslySetInnerHTML = {{__html:svgRemove}}
            onClick={ onRemove }
          >
          </div>
        </div>
      }

    </Fragment>
  )
})
