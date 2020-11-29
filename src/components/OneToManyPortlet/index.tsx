import React from 'react';
import { makeStyles, Theme, createStyles, Grid, Divider, IconButton } from '@material-ui/core';
import MutiContentPotlet from 'components/common/MutiContentPotlet';
import { fade } from '@material-ui/core/styles/colorManipulator';
import CloseIcon from '@material-ui/icons/Close';
import { addTempIdToTable, creatId, removeTempIdToTable } from 'components/common/Helpers';
import { RXInputProps } from 'base/RXInputProps';
import { creatRowModel, RowModelContext } from 'components/OneToManyPortlet/RowModelContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
    },

    itemToolbar:{
      padding:theme.spacing(1, 2.2),
      fontWeight:'bold',
      backgroundColor: fade(theme.palette.secondary.main, 0.04),
      alignItems:"center",
    }
  }),
);

const OneToManyPortlet = React.forwardRef((
  props: RXInputProps& {
    value?:Array<any>,   
    title?:string,
    isDeisgning?:boolean,
    children?:any,
    style?:any,
    onChange?:(event:any)=>void,
  },
  ref:any
)=>{
  const {name, loading, value, title, isDeisgning, children, onChange, ...rest} = props;
  const classes = useStyles();
  
  //const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
  //  control,
  //  name: name
  //});

  const emitValueChangded = (newValue:any) => {
    const event = {
      persist: () => {return {}},
      target: {
        type: "change",
        name: props.name,
        value: removeTempIdToTable(newValue),
      }
    };
    onChange && onChange(event);
  }
  const valueRows =  value? addTempIdToTable(value) :[];
  const rows = isDeisgning ? [{id:1}] : valueRows;

  const handleAddNew = ()=>{
    if(isDeisgning){
      return;
    }
    const newValue = [...rows, {id:creatId()}]
    emitValueChangded(newValue)
  }

  const handelRemove = (index:number)=>{
    let tempRows = [...rows];
    tempRows.splice(index, 1);
    emitValueChangded(tempRows);
  }

  return (
    <MutiContentPotlet title={title} ref={ref} {...rest}
      onAddNew = {handleAddNew}
    >
      {
        rows.map((item, index)=>{
          return(
            <RowModelContext.Provider value={creatRowModel(name, index, item)} key = {item.id}>
              <Grid container key = {item.id}>
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
            </RowModelContext.Provider>            
          )
        })
      }

    </MutiContentPotlet>
  )
})

export default OneToManyPortlet