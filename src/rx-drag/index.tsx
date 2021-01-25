import * as React from 'react';
import { observer } from 'mobx-react';
import { IRxMeta } from './IRxMeta';
import { IRxThemeOptions } from './IRxThemeOptions';
import './style.css';
import { Toolbox } from './Toolbox';
import { NodeNavigation } from './NodeNavigation';

export interface IRxDragProps{
  theme?: IRxThemeOptions,
  json?: Array<IRxMeta>,
  onChange?: (json : Array<IRxMeta>)=>void,
}

export const RxDrag = observer((
  props: IRxDragProps
) => {

  return (
    <div className = 'rx-drag'>
      <div className = 'rx-left'>
        <Toolbox />
        <div className = 'rx-canvas-wapper'>
        rx-canvas-wapper<br/><br/><br/><br/><br/><br/><br/>
        rx-canvas-wapper<br/><br/><br/><br/><br/><br/><br/>
        rx-canvas-wapper<br/><br/><br/><br/><br/><br/><br/>
        rx-canvas-wapper<br/><br/><br/><br/><br/><br/><br/>
        rx-canvas-wapper<br/><br/><br/><br/><br/><br/><br/>
        rx-canvas-wapper<br/><br/><br/><br/><br/><br/><br/>
        rx-canvas-wapper<br/><br/><br/><br/><br/><br/><br/>
        rx-canvas-wapper<br/><br/><br/><br/><br/><br/><br/>
        rx-canvas-wapper<br/><br/><br/><br/><br/><br/><br/>
        rx-canvas-wapper<br/><br/><br/><br/><br/><br/><br/>
        rx-canvas-wapper<br/><br/><br/><br/><br/><br/><br/>
        rx-canvas-wapper<br/><br/><br/><br/><br/><br/><br/>
        rx-canvas-wapper<br/><br/><br/><br/><br/><br/><br/>
        rx-canvas-wapper<br/><br/><br/><br/><br/><br/><br/>
        rx-canvas-wapper<br/><br/><br/><br/><br/><br/><br/>
        </div>
        <NodeNavigation />
      </div>
      <div className = 'rx-right'>
        rx-right
      </div>
    </div>
  );
})
