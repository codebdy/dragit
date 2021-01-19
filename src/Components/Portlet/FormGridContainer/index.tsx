import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles, Grid } from '@material-ui/core';
import classNames from 'classnames';
import { ModelProvider, useModelStore } from 'Base/ModelTree/ModelProvider';
import {observer} from 'mobx-react';
import { DADA_RXID_CONST } from 'Base/RXNode/RXNode';
import { RXModel } from 'Base/ModelTree/RXModel';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    portletBody: {
      padding:theme.spacing(1),
      width:'100%',
    },    
  }),
);

const FormGridContainer = observer(React.forwardRef((props:any, ref:any) => {
  const {[DADA_RXID_CONST]:rxid, rxNode, className, children, error, helperText, ...rest} = props
  const classes = useStyles();
  const modelStore =  useModelStore();
  const fieldStore = modelStore?.getChild(rxNode?.meta.field);

  const fieldName = rxNode?.meta.field;  
  
  useEffect(()=>{
    if(fieldName && rxNode){
      const rxModel = new RXModel(rxNode, fieldName);
      rxModel.setLabel(`Submodel : ${fieldName}`);
      modelStore?.setChild(fieldName, rxModel);
      return ()=>{
        modelStore?.removeChildStore(fieldName);
      }      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldName])
  
  return (
    <Grid {...{[DADA_RXID_CONST]:rxid}} container spacing={2} className={ classNames(classes.portletBody, className) } {...rest} ref={ref}>
      {
        rxNode?.meta.field?
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

