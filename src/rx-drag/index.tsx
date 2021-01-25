import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import { IRxMeta } from './IRxMeta';

//通过代码复制，快构建一个响应式组件
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
    },
  }),
);

export interface IRxDragProps{
  json: Array<IRxMeta>,
  onChange: ()=>void,
}

export const RxDrag = observer(() => {
  const classes = useStyles();

  return (
    <div className = {classes.root}>
      RxDrag
    </div>
  );
})
