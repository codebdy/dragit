import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import JsxParser from 'react-jsx-parser'
import { useDesign } from 'design/PageEditor/useDesign';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    design: {
    },
  }),
);

const JsxTemplateView = React.forwardRef((
  props:{
    model?:boolean,
    graphiQL?:string,
  },
  ref:any
)=>{
  const {model, graphiQL, ...rest} = props;
  const {isDesigning} = useDesign();
  const classes = useStyles();

  return (
    isDesigning?
    <div 
      ref={ref}
      className = {classes.design }
      {...rest}
    >
      Jsx template view 
    </div>
    :
    <JsxParser />
  )
})

export default JsxTemplateView