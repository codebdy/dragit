import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles, Table, TableBody, TableCell, TableHead, TableRow, IconButton } from '@material-ui/core';
import Portlet from 'components/Portlet';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import classNames from 'classnames';
import { resolveNode } from 'DragIt';

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
var seedId = 1;

const OneToManyTable = React.forwardRef((
  props: {
    value?:any
    className?:any,
    onChange:(event:any)=>void,
    error:boolean,
    helperText?:string,
    id?:string,
    name?:string,
    style?:any,
    inputRef?:any,
    size?:any,
    columns?:Array<ColumnMeta>
  }, 
  ref:any
)=>{
  const{value, className,  
    onChange, 
    error,
    helperText, 
    name,
    style,
    inputRef,
    size,
    columns = [],
     ...rest
  } = props;
  const classes = useStyles();
  const [rows, setRows] = React.useState<Array<any>>(value? value :[]);


  useEffect(() => {
    setRows(value? value :[])
  },[value]);
  
  useEffect(() => {
    if(rows !== value && !(!value && rows.length === 0)){
      const event = {
        persist: () => {return {}},
        target: {
          type: "change",
          name: props.name,
          value: rows.map(row=>{
            const newId = (row.id && row.id.toString().startsWith('TEMP-'))? undefined: row.id;
            return {...rows, id: newId }
          })
        }
      };
 
      console.log('useEffect',onChange, event)
      onChange && onChange(event);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[rows]);

  const handleAddNew = ()=>{
    setRows([...rows, {id:`TEMP-${seedId++}`}]);
  }

  const handelRemove = (index:number)=>{
    let tempRows = [...rows];
    tempRows.splice(index, 1);
    setRows(tempRows);
  }

  const handleChange = (index: number, field?:string, value?:any)=>{
    if(field){
      let tempRows = [...rows];
      tempRows[index][field] = value;
      setRows(tempRows);      
    }
  }


  return (
    <Portlet 
      ref={ref}
      id = {name}
      style={style}
      withHeader      
      {...rest}
      className = { className }
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
            {rows.map((row:any, rowIndex) => (
              <TableRow key={`row-${rowIndex}-${row.id}`} >
                {
                  columns.map((column, index)=>{
                    const{width = undefined, ...other} = (column.props?column.props : {})
                    const InputControl = resolveNode(column.input&&column.input.name ? column.input.name :'TextField');
                    const theValue = column.field ? row[column.field]:  '';
                    return(
                      <TableCell key={`${column}-${index}-row-${rowIndex}`} style={{width:width}} {...other}>
                        <InputControl 
                          value={theValue||''} 
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
