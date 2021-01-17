import React, { useEffect, useMemo } from 'react';
import { makeStyles, Theme, createStyles, Grid, Divider, IconButton } from '@material-ui/core';
import MultiContentPotlet from 'Components/Common/MultiContentPotlet';
import { fade } from '@material-ui/core/styles/colorManipulator';
import CloseIcon from '@material-ui/icons/Close';
import { ModelProvider, useModelStore } from 'Base/ModelTree/ModelProvider';
import { ModelArrayFieldStore } from '../ModelArrayFieldStore';
import {Observer} from 'mobx-react';
import { useDesign } from 'Design/PageEditor/useDesign';
import { useRXNode } from 'Base/RXNode/RXNodeProvider';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
    },

    itemToolbar:{
      padding:theme.spacing(1, 2.2),
      fontWeight:'bold',
      backgroundColor: fade(theme.palette.secondary.main, 0.04),
      alignItems:"center",
    },
    storeBuilder:{
      display:'none',
    }
  }),
);

const OneToManyPortlet = React.forwardRef((
  props: any,
  ref:any
)=>{
  const {field, loading, value, title, children, ...rest} = props;
  const {isDesigning} = useDesign();
  const classes = useStyles();
  const modelStore =  useModelStore();
  const node = useRXNode();
  const fieldStore = modelStore?.getFieldStore(field) as ModelArrayFieldStore;
  useEffect(()=>{
    modelStore?.setFieldStore(field,  new ModelArrayFieldStore(node));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field])

  const fieldStoreForDesign = useMemo(()=>{
    if(isDesigning){
      const store = new ModelArrayFieldStore()
      store.addRow()
      return store;      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isDesigning]);


  const handleAddNew = ()=>{
    if(isDesigning){
      return;
    }
    fieldStore?.addRow();
  }

  const handelRemove = (index:number)=>{
    fieldStore?.removeRow(index);
  }

  const store = isDesigning ? fieldStoreForDesign : fieldStore;

  return (
    <Observer>
      {() =>
        <MultiContentPotlet title={title} ref={ref} {...rest}
          onAddNew = {handleAddNew}
        >
          <div className = {classes.storeBuilder}>
            <ModelProvider value = {fieldStore?.schemaRow}>
              {children}
            </ModelProvider>
          </div>
          {
            store?.rows.map((rowStore, index)=>{
              return(
                <ModelProvider value={rowStore} key = {rowStore.id}>
                  <Grid container >
                    <Grid container item xs={12} justify = "space-between" className={classes.itemToolbar}>
                      <Grid item>{title} #{index + 1}</Grid>
                      <Grid item>
                        <IconButton aria-label="delete"
                          onClick = {(event) => {handelRemove(index)}}
                          size="small"
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                      {children}
                    </Grid>
                  </Grid>
                </ModelProvider>            
              )
            })
          }

        </MultiContentPotlet>
      }
    </Observer>
  )
})

export default OneToManyPortlet