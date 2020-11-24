import React from 'react';
import { makeStyles, Theme, createStyles, Table, TableBody, TableCell, TableHead, TableRow, IconButton } from '@material-ui/core';
import Portlet from 'components/Portlet';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import classNames from 'classnames';
import { resolveComponent } from 'base/DragRX';
import { RXInputProps } from 'base/RXInputProps';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body:{
      //padding:theme.spacing(2),
    },
    table: {
      width: '100%',
    },
    addNewArea:{
      display:'flex',
      justifyContent:'center',
      padding:theme.spacing(1),
    },
    helperText:{
      padding:theme.spacing(1),
    },
    error:{
      color:'red',
    }
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
  props: {
    value?:any
    onChange:(event:any)=>void,
    size?:any,
    columns?:Array<ColumnMeta>
  } & RXInputProps, 
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
  var seedId = 1;
  const creatId = ()=>{
    return `TEMP-${seedId++}`;
  }
  const rows = value? value.map((item:any)=>{
    return {...item, id:item.id? item.id: creatId()}
  }) :[]

  //useEffect(() => {
  //  setRows(value? value :[])
  //},[value]);
  
  const emitValueChangded = (newValue:any) => {
    const event = {
      persist: () => {return {}},
      target: {
        type: "change",
        name: props.name,
        value: newValue?.map((row:any)=>{
          const newId = (row.id && row.id.toString().startsWith('TEMP-'))? undefined: row.id;
          return {...row, id: newId }
        })
      }
    };
    //console.log('useEffect',onChange, event)
    onChange && onChange(event);
  }


  const handleAddNew = ()=>{
    const newValue = [...rows, {id:creatId()}]
    //setRows(newValue);
    emitValueChangded(newValue)
  }

  const handelRemove = (index:number)=>{
    let tempRows = [...rows];
    tempRows.splice(index, 1);
    //setRows(tempRows);
    emitValueChangded(tempRows);
  }

  const handleChange = (index: number, field?:string, value?:any)=>{
    //console.log('OneToManyTable', field, value)    
    if(field){
      let tempRows = [...rows];
      tempRows[index][field] = value;
      //setRows(tempRows); 
      emitValueChangded(tempRows);     
    }
  }

  return (
    <Portlet 
      ref={ref}
      withHeader      
      {...rest}
    >

      <div className={classes.body}>
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
        <div className={classes.addNewArea}>
          <IconButton onClick={handleAddNew} >
            <AddIcon />
          </IconButton>
        </div>
        <div className={classNames(classes.helperText, {[classes.error]:error})}>{helperText}</div>
      </div>
    </Portlet>
  )
})

export default OneToManyTable;
