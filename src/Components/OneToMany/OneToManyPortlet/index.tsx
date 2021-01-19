import React from 'react';
import { makeStyles, Theme, createStyles, Grid, Divider, IconButton } from '@material-ui/core';
import MultiContentPotlet from 'Components/Common/MultiContentPotlet';
import { fade } from '@material-ui/core/styles/colorManipulator';
import CloseIcon from '@material-ui/icons/Close';
import { ModelProvider, useModelStore } from 'Base/ModelTree/ModelProvider';
import { useDesign } from 'Design/PageEditor/useDesign';
import { makeTableRowModel } from 'Base/ModelTree/makeTableModel';
import { ID } from 'Base/Model/graphqlTypes';
import { observer } from 'mobx-react';
import { DADA_RXID_CONST } from 'Base/RXNode/RXNode';
import { ComponentRender } from 'Base/PageUtils/ComponentRender';
import { useSetChildStore } from '../useSetChildStore';

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

const OneToManyPortlet = observer(React.forwardRef((
  props: any,
  ref:any
)=>{
  const {loading, rxNode, value, title, children, ...rest} = props;
  const {isDesigning} = useDesign();
  const classes = useStyles();
  const modelStore =  useModelStore();
  const fieldStore = modelStore?.getChild(rxNode?.meta.field);

  useSetChildStore(rxNode, 'OneToManyPortletRow');
  
  //const fieldStoreForDesign = useMemo(()=>{
  //  if(isDesigning){
      //const store = new RXNode()
      //store.addRow()
  //    return store;      
  //  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  //},[isDesigning]);


  const handleAddNew = ()=>{
    if(isDesigning){
      return;
    }
    makeTableRowModel(fieldStore?.value,  fieldStore, rxNode, 'OneToManyPortletRow')
  }

  const handelRemove = (id:ID)=>{
    fieldStore?.removeChildStore(id);
  }

  //const store = isDesigning ? fieldStoreForDesign : fieldStore;

  return (
    <MultiContentPotlet title={title} ref={ref} {...rest} {...{[DADA_RXID_CONST]:fieldStore?.node?.rxid}}
      onAddNew = {handleAddNew}
    >
      <div className = {classes.storeBuilder}>{/*
        <ModelProvider value = {fieldStore?.schemaRow}>
          {children}
      </ModelProvider>*/}
      </div>
      {
        fieldStore?.getChildren()?.map((rowStore, index)=>{
          return(
            <ModelProvider value={rowStore} key = {rowStore.id}>
              <Grid container >
                <Grid container item xs={12} justify = "space-between" className={classes.itemToolbar}>
                  <Grid item>{title} #{index + 1}</Grid>
                  <Grid item>
                    <IconButton aria-label="delete"
                      onClick = {(event) => {handelRemove(rowStore.id)}}
                      size="small"
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid item xs={12} {...{[DADA_RXID_CONST]:rowStore?.node?.rxid}}>
                  <Divider />
                  {
                    rowStore?.node?.children.map((column)=>{
                      return(
                        <ComponentRender key={`${column?.id}-${rowStore.id}`} node = {column} />
                      )
                    })
                  }
                </Grid>
              </Grid>
            </ModelProvider>            
          )
        })
      }

    </MultiContentPotlet>
  )
}))

export default OneToManyPortlet