import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import JsxParser from 'react-jsx-parser'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    design: {
    },
  }),
);

const JsxTemplateView = React.forwardRef((
  props:{
    isDesigning?:boolean,
    model?:boolean,
    graphiQL?:string,
  },
  ref:any
)=>{
  const {isDesigning, model, graphiQL, ...rest} = props;
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