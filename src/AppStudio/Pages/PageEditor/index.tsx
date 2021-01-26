import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import { RxDrag } from 'rx-drag';
import intl from 'react-intl-universal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
    },
  }),
);


export const PageEditor = observer(() => {
  const classes = useStyles();

  return (
    <RxDrag
      toolbox = {<div>tool box</div>}
      attributeBox = {<div>Attributes box</div>}
      pageSettings = {<div>Settings box</div>}
      locales = {{
        components:intl.get('component'),
        attributes:intl.get('attributes'),
        pageSettings:intl.get('page-settings')
      }}
    />
  );
})
