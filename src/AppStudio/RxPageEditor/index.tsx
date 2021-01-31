import * as React from 'react';
import { createMuiTheme, ThemeProvider, useTheme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import { RxDrag } from 'rx-drag';
import intl from 'react-intl-universal';
import { useAppStudioStore } from 'AppStudio/AppStudioStore';
import { RxThemeMode } from 'rx-drag/store/IRxThemeOptions';
import { RxDragStoreProvider } from 'rx-drag/store/useDesign';
import { RxDragStore } from 'rx-drag/store/RxDragStore';
import { Toolbox } from './Toolbox';
import { AttributeBox } from './AttrebuteBox';
import SettingsBox from './SettingsBox';
import { useEffect } from 'react';
import { IRxMeta } from 'rx-drag/models/IRxMeta';
import { useRouteMatch } from 'react-router-dom';

export const RxPageEditor = observer(() => {
  const [rxDragStore] = React.useState<RxDragStore>(new RxDragStore());
  const studioStore = useAppStudioStore();
  const match = useRouteMatch();
  const{pageId} = match.params as any;  

  const rxPage = pageId ? studioStore?.getPage(pageId) : studioStore?.getFirstPage();

  useEffect(()=>{
    if(rxPage){
      studioStore?.editPage(rxPage);
    }
    rxDragStore?.setSelectedNode(undefined);
  },[rxDragStore, rxPage, studioStore]);

  const handleThemeModeChange = (mode :RxThemeMode)=>{
    studioStore?.setThemeMode(mode);
  }

  const handleChange = (metas: Array<IRxMeta>)=>{
    if(studioStore?.pageEditor?.currentData){
      studioStore?.pageEditor?.setCurrentData({...studioStore?.pageEditor?.currentData, schema:metas});
    }
  }

  return (
      <RxDragStoreProvider value = {rxDragStore}>
        <RxDrag
          theme = {
            {
              mode:studioStore?.themeMode,
            }
          }
          initMetas = {rxPage?.schema}
          toolbox = {
            <Toolbox/>
          }
          attributeBox = {
            <AttributeBox/>
          }
          pageSettings = {
            <SettingsBox />
          }
          locales = {{
            components:intl.get('component'),
            attributes:intl.get('attributes'),
            pageSettings:intl.get('page-settings')
          }}

          onThemeModeChange = {handleThemeModeChange}

          onChange = {handleChange}
        />
      </RxDragStoreProvider>

  );
})
