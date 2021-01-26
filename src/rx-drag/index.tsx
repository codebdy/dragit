import * as React from 'react';
import { observer } from 'mobx-react';
import { IRxMeta } from './IRxMeta';
import { IRxThemeOptions, RxThemeMode } from './context/IRxThemeOptions';
import { Toolbar } from './Toolbar';
import { NodeNavigation } from './NodeNavigation';
import { RxDragStore } from './context/RxDragStore';
import { RxDragStoreProvider } from './context/useRxDragStore';
import classNames from 'classnames';
import { Sidebar } from './Sidebar';
import { IRxLocales } from './IRxLocales';
import './style.css';
import './core.css';
import { useEffect } from 'react';

export interface IRxDragProps{
  theme?: IRxThemeOptions,
  initJson?: Array<IRxMeta>,
  toolbox?: JSX.Element,
  attributeBox?: JSX.Element,
  pageSettings?: JSX.Element,
  locales?:IRxLocales,
  onChange?: (json : Array<IRxMeta>)=>void,
  onThemeModeChange?:(mode :RxThemeMode)=>void,
}

export const RxDrag = observer((
  props: IRxDragProps
) => {
  const {theme, toolbox, attributeBox, pageSettings, locales, onThemeModeChange} = props;
  const [store] = React.useState(new RxDragStore(locales))

  useEffect(()=>{
    store?.setThemeOptions(theme);
  }, [store, theme]);

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
          <Toolbar onThemeModeChange = {onThemeModeChange}/>
          <div className = 'rx-canvas-background'

          >
            <div 
              className = 'rx-canvas'
              style={{
                backgroundColor: store?.themeOptions.canvasColor,
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
          <Sidebar
            toolbox = {toolbox}
            attributeBox = {attributeBox}
            pageSettings = {pageSettings}
          />
        </div>
      </div>
    </RxDragStoreProvider>
  );
})
