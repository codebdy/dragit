import React, { useState } from 'react';
import { makeStyles, Theme, createStyles, Table, TableBody, TableCell, TableHead, TableRow, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { resolveComponent } from 'base/DragRX';
import { RXInputProps } from 'base/RXInputProps';
import MultiContentPotlet from 'components/common/MultiContentPotlet';
import { addTempIdToTable, creatId, removeTempIdToTable } from 'components/common/Helpers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      width: '100%',
    },
  }),
);

interface ColumnMeta{
  field?:string;
  label?:string;
  props?:any;
  input?:{
    name:string,
    props:any,
  };
}

//新建记录时，添加TEMP-作为ID，需要后端处理，或者提交表单数据时处理
const OneToManyTable = React.forwardRef((
  props: RXInputProps& {
    value?:any
    onChange:(event:React.ChangeEvent<any>)=>void,
    size?:any,
    columns?:Array<ColumnMeta>
  }, 
  ref:any
)=>{
  const{
    loading,
    value,  
    onChange, 
    error,
    helperText, 
    name,
    size,
    columns = [],
     ...rest
  } = props;
  const classes = useStyles();
  const [rows, setRows] = useState(value? addTempIdToTable(value) :[]);
 
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


  const handleAddNew = ()=>{
    const newValue = [...rows, {id:creatId()}]
    setRows(newValue);
    emitValueChangded(newValue)
  }

  const handelRemove = (index:number)=>{
    console.log('handelRemove')
    let tempRows = [...rows];
    tempRows.splice(index, 1);
    setRows(tempRows);
    emitValueChangded(tempRows);
  }

  const handleChange = (index: number, field?:string, value?:any)=>{
    //console.log('OneToManyTable', field, value)    
    if(field){
      let tempRows = [...rows];
      tempRows[index][field] = value;
      setRows(tempRows); 
      emitValueChangded(tempRows);     
    }
  }

  return (
    <MultiContentPotlet 
      ref={ref}
      onAddNew = {handleAddNew}
      {...rest}
    >
        <Table className={classes.table} size={size}>
          <TableHead>
            <TableRow>
              {
                columns.map((column, index)=>{
                  const{width = undefined, ...other} = (column.props?column.props : {})
                  return(
                    <TableCell key={`${column}-${index}`} component="th" style={{width:width}} {...other}>
                      <b>
                        {column.label}
                      </b>
                    </TableCell>
                  )
                })
              }
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row:any, rowIndex:any) => (
              <TableRow key={`row-${row.id}`} >
                {
                  columns.map((column, index)=>{
                    const{width = undefined, ...other} = (column.props?column.props : {})
                    const InputControl = resolveComponent(column.input as any);
                    return(
                      <TableCell key={`${column}-${index}-row-${rowIndex}`} style={{width:width}} {...other}>
                        <InputControl 
                          value={(column.field && row[column.field]) ||''} 
                          {...column.input?.props}
                          onChange={(e:any)=>handleChange(rowIndex, column.field, e.target.value)}
                        />
                      </TableCell>
                    )
                  })
                }
                <TableCell align="right">
                  <IconButton aria-label="delete"
                    onClick = {(event) => {handelRemove(rowIndex)}}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>    
    </MultiContentPotlet>
  )
})

export default OneToManyTable;
