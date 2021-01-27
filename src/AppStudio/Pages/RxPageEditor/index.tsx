import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import { RxDrag } from 'rx-drag';
import intl from 'react-intl-universal';
import { useAppStudioStore } from 'AppStudio/AppStudioStore';
import { RxThemeMode } from 'rx-drag/store/IRxThemeOptions';
import { RxDragStoreProvider } from 'rx-drag/store/useDesign';
import { RxDragStore } from 'rx-drag/store/RxDragStore';
import { IRxPage } from 'Base/Model/IRxPage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
    },
  }),
);


export const RxPageEditor = observer((
  props:{
    rxPage:IRxPage
  }
) => {
  const {rxPage} = props; 
  const classes = useStyles();
  const [rxDragStore] = React.useState<RxDragStore>(new RxDragStore());
  const studioStore = useAppStudioStore();
  const handleThemeModeChange = (mode :RxThemeMode)=>{
    studioStore?.setThemeMode(mode);
  }
  return (
    <RxDragStoreProvider value = {rxDragStore}>
      <RxDrag
        theme = {
          {
            mode:studioStore?.themeMode,
          }
        }
        initMetas = {rxPage.schema}
        toolbox = {<div>tool box</div>}
        attributeBox = {<div>Attributes box</div>}
        pageSettings = {<div>Settings box</div>}
        locales = {{
          components:intl.get('component'),
          attributes:intl.get('attributes'),
          pageSettings:intl.get('page-settings')
        }}

        onThemeModeChange = {handleThemeModeChange}
      />
    </RxDragStoreProvider>
  );
})
