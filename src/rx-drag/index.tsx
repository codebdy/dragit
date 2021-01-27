import * as React from 'react';
import { observer } from 'mobx-react';
import { IRxMeta } from './IRxMeta';
import { IRxThemeOptions, RxThemeMode } from './context/IRxThemeOptions';
import { Toolbar } from './Toolbar';
import { NodeNavigation } from './NodeNavigation';
import { RxDragShellStore } from './context/RxDragShellStore';
import { RxDragShellStoreProvider } from './context/useRxDragShellStore';
import classNames from 'classnames';
import { Sidebar } from './Sidebar';
import { IRxLocales } from './IRxLocales';
import './style.css';
import './core.css';
import { useEffect } from 'react';
import { RxDragCoreStore } from './context/RxDragCoreStore';
import { RxDragCoreStoreProvider } from './context/useDesign';

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
  const [shellStore] = React.useState(new RxDragShellStore(locales))
  const [coreStore, setCoreStore] = React.useState<RxDragCoreStore>();

  useEffect(()=>{
    shellStore?.setThemeOptions(theme);
  }, [shellStore, theme]);

  useEffect(() => {
    //复制一个副本
    //setEditorStore(new RxDragCoreStore( cloneObject(data?.page)))

  },[]);

  return (
    <RxDragShellStoreProvider value = {shellStore}>
      <RxDragCoreStoreProvider value = {coreStore}>
        <div 
          className = {classNames('rx-drag', shellStore.themeOptions.themeModeClass)}
          style = {
            {
              borderColor:shellStore?.themeOptions.borderColor,
              backgroundColor:shellStore?.themeOptions.backgroundColor,
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
                  backgroundColor: shellStore?.themeOptions.canvasColor,
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
            { 'collapse':shellStore.rightFolded }
          )}
          style = {{borderColor:shellStore?.themeOptions.borderColor}}
          >
            <Sidebar
              toolbox = {toolbox}
              attributeBox = {attributeBox}
              pageSettings = {pageSettings}
            />
          </div>
        </div>
      </RxDragCoreStoreProvider>
    </RxDragShellStoreProvider>
  );
})
