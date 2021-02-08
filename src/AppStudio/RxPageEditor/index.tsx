import * as React from 'react';
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
import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import PageDialog from 'Base/Widgets/PageDialog';
import { CodeMirrorEditor } from 'Base/Widgets/CodeMirrorEditor';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    jsonEditor: {
      width: '100%',
      padding: theme.spacing(2),
      color:theme.palette.text.secondary,
    },
  }),
);

export const RxPageEditor = observer(() => {
  const [rxDragStore] = React.useState<RxDragStore>(new RxDragStore());
  const studioStore = useAppStudioStore();
  const match = useRouteMatch();
  const{pageId} = match.params as any;  
  const [showJSON, setShowJSON] = useState(false);
  const [pageJSONSchema, setPageJSONSchema] = useState('');
  const classes = useStyles();

  const rxPage = pageId ? studioStore?.getPage(pageId) : studioStore?.getFirstPage();

  useEffect(()=>{
    if(rxPage){
      studioStore?.editPage(rxPage);
    }
    setPageJSONSchema(rxPage?.schema ||'');
    rxDragStore?.setSelectedNode(undefined);
  },[rxDragStore, rxPage, studioStore]);

  const handleThemeModeChange = (mode :RxThemeMode)=>{
    studioStore?.setThemeMode(mode);
  }

  const handleChange = (schema: string)=>{
    if(studioStore?.pageEditor?.currentData){
      studioStore?.pageEditor?.setCurrentData({...studioStore?.pageEditor?.currentData, schema});
    }
  }

  const handleShowJson = (schema:string)=>{
    setShowJSON(true);
    setPageJSONSchema(schema);
  }

  return (
      <RxDragStoreProvider value = {rxDragStore}>
        <RxDrag
          theme = {
            {
              mode:studioStore?.themeMode,
            }
          }
          schema = {pageJSONSchema}
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
          onShowJson = {handleShowJson}
        />

        <PageDialog 
          title="JSON Schema" 
          maxWidth = "lg"
          open = {showJSON}
          onClose = {()=>{setShowJSON(false)}}
        >
          <div className = {classes.jsonEditor}>
            <CodeMirrorEditor 
              value = {pageJSONSchema} 
              mode="application/json"
              height = "calc(100vh - 150px)"
            />
          </div>
        </PageDialog>
      </RxDragStoreProvider>

  );
})
