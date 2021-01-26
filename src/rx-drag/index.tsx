import * as React from 'react';
import { observer } from 'mobx-react';
import { IRxMeta } from './IRxMeta';
import { IRxThemeOptions, LIGHT } from './context/IRxThemeOptions';
import './style.css';
import { Toolbar } from './Toolbar';
import { NodeNavigation } from './NodeNavigation';
import { RxDragStore } from './context/RxDragStore';
import { RxDragStoreProvider } from './context/useRxDragStore';
import classNames from 'classnames';
import { Sidebar } from './Sidebar';

export interface IRxDragProps{
  theme?: IRxThemeOptions,
  json?: Array<IRxMeta>,
  onChange?: (json : Array<IRxMeta>)=>void,
}

export const RxDrag = observer((
  props: IRxDragProps
) => {
  const [store] = React.useState(new RxDragStore())

  return (
    <RxDragStoreProvider value = {store}>
      <div 
        className = {classNames('rx-drag', store.themeOptions.themeModeClass)}
        style = {
          {
            borderColor:store?.themeOptions.borderColor,
            backgroundColor:store?.themeOptions.backgroundColor,
          }
        }
      >
        <div className = 'rx-left'>
          <Toolbar />
          <div className = 'rx-canvas-background'

          >
            <div 
              className = 'rx-canvas'
              style={{
                backgroundColor:store?.themeOptions.canvasColor,
              }}
            >
              rx-canvas-background<br/><br/><br/><br/><br/><br/><br/>
              rx-canvas-background<br/><br/><br/><br/><br/><br/><br/>
              rx-canvas-background<br/><br/><br/><br/><br/><br/><br/>
              rx-canvas-background<br/><br/><br/><br/><br/><br/><br/>
              rx-canvas-background<br/><br/><br/><br/><br/><br/><br/>
              rx-canvas-background<br/><br/><br/><br/><br/><br/><br/>
              rx-canvas-background<br/><br/><br/><br/><br/><br/><br/>
              rx-canvas-background<br/><br/><br/><br/><br/><br/><br/>
              rx-canvas-background<br/><br/><br/><br/><br/><br/><br/>
              rx-canvas-background<br/><br/><br/><br/><br/><br/><br/>
              rx-canvas-background<br/><br/><br/><br/><br/><br/><br/>
              rx-canvas-background<br/><br/><br/><br/><br/><br/><br/>
              rx-canvas-background<br/><br/><br/><br/><br/><br/><br/>
              rx-canvas-background<br/><br/><br/><br/><br/><br/><br/>
              rx-canvas-background<br/><br/><br/><br/><br/><br/><br/>
            </div>
          </div>
          <NodeNavigation />
        </div>
        <div className = {classNames(
          'rx-right', 
          { 'collapse':store.rightFolded }
        )}
        style = {{borderColor:store?.themeOptions.borderColor}}
        >
          <Sidebar />
        </div>
      </div>
    </RxDragStoreProvider>
  );
})
