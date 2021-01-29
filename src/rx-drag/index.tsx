import * as React from 'react';
import { observer } from 'mobx-react';
import { IRxMeta } from './models/IRxMeta';
import { IRxThemeOptions, RxThemeMode } from './store/IRxThemeOptions';
import { Toolbar } from './Toolbar';
import { NodeNavigation } from './NodeNavigation';
import { RxDragShellStore } from './store/RxDragShellStore';
import { RxDragShellStoreProvider } from './store/useRxDragShellStore';
import classNames from 'classnames';
import { Sidebar } from './Sidebar';
import { IRxLocales } from './models/IRxLocales';
import './style.css';
import { useEffect } from 'react';
import { useRxDragStore } from './store/useDesign';
import { cloneObject } from './utils/cloneObject';
import { RxDragCore } from './core';
import { toJS } from 'mobx';

export interface IRxDragProps{
  theme?: IRxThemeOptions,
  initMetas?: Array<IRxMeta>,
  toolbox?: JSX.Element,
  attributeBox?: JSX.Element,
  pageSettings?: JSX.Element,
  locales?:IRxLocales,
  onChange?: (metas : Array<IRxMeta>)=>void,
  onThemeModeChange?:(mode :RxThemeMode)=>void,
}

export const RxDrag = observer((
  props: IRxDragProps
) => {
  const {theme, initMetas, toolbox, attributeBox, pageSettings, locales, onChange, onThemeModeChange} = props;
  const [shellStore] = React.useState(new RxDragShellStore(locales))
  const rxDragStore = useRxDragStore();
  rxDragStore?.setValueChangeFn(onChange);

  useEffect(()=>{
    rxDragStore?.setMetas(cloneObject(toJS(initMetas)));
  },[rxDragStore, initMetas])

  useEffect(()=>{
    shellStore?.setThemeOptions(theme);
  }, [shellStore, theme]);

  const handleScroll = ()=>{
    rxDragStore?.refreshToolbarAndLabel();
  }

  return (
    <RxDragShellStoreProvider value = {shellStore}>
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
          <div 
            className = 'rx-canvas-background'
            onScroll = {handleScroll}
          >
            <div 
              className = 'rx-canvas'
              style={{
                backgroundColor: shellStore?.themeOptions.canvasColor,
              }}
            >

              {rxDragStore&&
                <RxDragCore rxDragStore = {rxDragStore} />
              }
              
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
    </RxDragShellStoreProvider>
  );
})
