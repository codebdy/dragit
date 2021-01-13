import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import JsxParser from 'react-jsx-parser'
import { useDesign } from 'Design/PageEditor/useDesign';
import classNames from 'classnames';
import IconButton from 'Components/Buttons/IconButton';
import { useModelStore } from 'Base/ModelTree/ModelProvider';
import { PageAction } from 'Base/Action/PageAction';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display:'inline',
    },
  }),
);

const JsxTemplateParser = React.forwardRef((
  props:{
    actions?:{[key:string]:PageAction},
    className?:any,
    graphiQL?:string,
    template:string,
  },
  ref:any
)=>{
  const {actions, className, graphiQL, template, ...rest} = props;
  const classes = useStyles();
  const {isDesigning} = useDesign();
  const modelStore = useModelStore();

  const actionHandles = {} as any;
  if(actions){
    Object.keys(actions).forEach(function(key){
      const action = actions[key];
      actionHandles[key] = ()=>{
        console.log('JsxParser handleClick', action.value)
      }
    });    
  }

  const parser = <JsxParser
                  bindings={{
                   ...actionHandles
                  }}
                  components={{ IconButton:IconButton as any }}
                  jsx = {template}
                  renderInWrapper = {false}
                  blacklistedAttrs = {[]}
                />
  return (
    isDesigning
    ? <div className={classNames(classes.root, className)} {...rest} ref={ref}>{parser}</div>
    : parser
  )
})

export default JsxTemplateParser