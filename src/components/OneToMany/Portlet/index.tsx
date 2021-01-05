import React, { useEffect, useMemo } from 'react';
import { makeStyles, Theme, createStyles, Grid, Divider, IconButton } from '@material-ui/core';
import MultiContentPotlet from 'components/common/MultiContentPotlet';
import { fade } from '@material-ui/core/styles/colorManipulator';
import CloseIcon from '@material-ui/icons/Close';
import { ModelProvider, useModelStore } from 'base/ModelTree/ModelProvider';
import { ModelArrayFieldStore } from '../ModelArrayFieldStore';
import {Observer} from 'mobx-react-lite';

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
  const {field, loading, value, title, isDeisgning, children, ...rest} = props;
  const classes = useStyles();
  const modelStore =  useModelStore();
  const fieldStore = modelStore?.getFieldStore(field) as ModelArrayFieldStore;
  useEffect(()=>{
    modelStore?.setFieldStore(field,  new ModelArrayFieldStore({name:field, props}));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field])

  const fieldStoreForDesign = useMemo(()=>{
    if(isDeisgning){
      const store = new ModelArrayFieldStore({name:field, props})
      store.addRow()
      return store;      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isDeisgning]);


  const handleAddNew = ()=>{
    if(isDeisgning){
      return;
    }
    fieldStore?.addRow();
  }

  const handelRemove = (index:number)=>{
    fieldStore?.removeRow(index);
  }

  const store = isDeisgning ? fieldStoreForDesign : fieldStore;

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