import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import JsxParser from 'react-jsx-parser'
import { useDesign } from 'Design/PageEditor/useDesign';
import classNames from 'classnames';
import IconButton from 'Components/Buttons/IconButton';
import { useModelStore } from 'Base/ModelTree/ModelProvider';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display:'inline',
    },
  }),
);

const JsxTemplateParser = React.forwardRef((
  props:{
    className?:any,
    graphiQL?:string,
    template:string,
  },
  ref:any
)=>{
  const {className, graphiQL, template, ...rest} = props;
  const classes = useStyles();
  const {isDesigning} = useDesign();
  const modelStore = useModelStore();

  const parser = <JsxParser
                  components={{ IconButton:IconButton as any }}
                  jsx = {template}
                  renderInWrapper = {false}
                />
  return (
    isDesigning
    ? <div className={classNames(classes.root, className)} {...rest} ref={ref}>{parser}</div>
    : parser
  )
})

export default JsxTemplateParser