import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles, Grid } from '@material-ui/core';
import classNames from 'classnames';
import { ModelProvider, useModelStore } from 'Base/ModelTree/ModelProvider';
import { ModelFieldStore } from 'Base/ModelTree/ModelFieldStore';
import useSelectModel from 'Components/Common/useSelectModel';
import {observer} from 'mobx-react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    portletBody: {
      padding:theme.spacing(1),
      width:'100%',
    },    
  }),
);

const FormGridContainer = observer(React.forwardRef((props:any, ref:any) => {
  const {'data-rxid':rxid, className, children, error, helperText, field, ...rest} = props
  const classes = useStyles();
  const modelStore =  useModelStore();
  const fieldStore = modelStore?.getFieldStore(field);

  useSelectModel(fieldStore, rxid);
  useEffect(()=>{
    if(field){
      modelStore?.setFieldStore(field,  new ModelFieldStore(props));
      return ()=>{
        modelStore?.removeFieldStore(field);
      }      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field])
  
  return (
    <Grid data-rxid = {rxid} container spacing={2} className={ classNames(classes.portletBody, className) } {...rest} ref={ref}>
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
}));
export default  FormGridContainer

