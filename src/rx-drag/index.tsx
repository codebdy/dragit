import * as React from 'react';
import { observer } from 'mobx-react';
import { IRxMeta } from './IRxMeta';
import { IRxTheme } from './IRxTheme';

export interface IRxDragProps{
  theme: IRxTheme,
  json: Array<IRxMeta>,
  onChange: (json : Array<IRxMeta>)=>void,
}

export const RxDrag = observer((
  props: IRxDragProps
) => {

  return (
    <div>
      RxDrag
    </div>
  );
})
