import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import JsxParser from 'react-jsx-parser'
import { useDesign } from 'rx-drag/store/useDesign';
import classNames from 'classnames';
import { useModelStore } from 'Base/ModelTree/ModelProvider';
import { IPageAction } from 'Base/Model/IPageAction';
import { useActionStore } from 'Base/PageUtils/ActionStore';
import {observer} from "mobx-react";
import { useDragItStore } from 'Store/Helpers/useDragItStore';
import { allRegisteredComponents } from 'rx-drag/RxDrag';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display:'inline',
    },
  }),
);

const JsxTemplateParser = observer(React.forwardRef((
  props:{
    actions?:{[key:string]:IPageAction},
    className?:any,
    graphiQL?:string,
    template:string,
    showSkeleton:boolean,
  },
  ref:any
)=>{
  const {actions, className, graphiQL, template, showSkeleton, ...rest} = props;
  const classes = useStyles();
  const {isDesigning} = useDesign();
  const modelStore = useModelStore();
  const actionStore = useActionStore();
  const dragItStore = useDragItStore();

  const actionHandles = {} as any;
  if(actions){
    Object.keys(actions).forEach(function(key){
      const action = actions[key];
      actionHandles[key] = ()=>{
        if(action.confirmMessage){
          dragItStore?.confirmAction(action.confirmMessage,()=>{actionStore?.emit(action);});
        }
        else{
          actionStore?.emit(action);
        }        
      }
    });    
  }

  const parser = <JsxParser
                  bindings={{
                   ...actionHandles,
                   //@@@value暂时没根据input跟新，复杂控件需要修改该部分
                   model: modelStore?.value||{},
                  }}
                  components={{ ...allRegisteredComponents() }}
                  jsx = {template}
                  renderInWrapper = {false}
                  blacklistedAttrs = {[]}
                />
  return (
    isDesigning
    ? <div className={classNames(classes.root, className)} {...rest} ref={ref}>JSX</div>
    : (modelStore?.loading && showSkeleton ? <Skeleton animation="wave" height={50} width="80%" /> : parser)
  )
}))

export default JsxTemplateParser