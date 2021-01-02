import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles, Grid } from '@material-ui/core';
import classNames from 'classnames';
import { ModelProvider, useModelStore } from 'base/ModelTree/ModelProvider';
import { ModelFieldStore } from 'base/ModelTree/ModelFieldStore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    portletBody: {
      padding:theme.spacing(1),
      width:'100%',
    },

  }),
);

const FormGridContainer = React.forwardRef((props:any, ref:any) => {
  const {className, children, error, helperText, field, ...rest} = props
  const classes = useStyles();
  const modelStore =  useModelStore();
  const fieldStore = modelStore.getFieldStore(field);
  useEffect(()=>{
    modelStore.setFieldStore(field,  new ModelFieldStore({name:field, props}));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field])
  
  return (
    <Grid container spacing={2} className={ classNames(classes.portletBody, className) } {...rest} ref={ref}>
      {
        field?
        <ModelProvider value = {fieldStore as any}>
          {children}
        </ModelProvider>
        :
        children
      }
    </Grid>
  )
});
export default  FormGridContainer

