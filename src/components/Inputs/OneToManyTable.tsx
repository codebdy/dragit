import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles, Table, TableBody, TableCell, TableHead, TableRow, IconButton, TextField } from '@material-ui/core';
import { MediaMeta } from '../Medias/MediaGridListImage';
import Portlet from 'components/Portlet';
import AddIcon from '@material-ui/icons/Add';
import DeleteForever from '@material-ui/icons/DeleteForever';

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
    }
  }),
);

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const OneToManyTable = React.forwardRef((
  props: {
    value?:any
    className?:any,
    cols?:number,
    onChange:(event:any)=>void,
    helperText?:string,
    id?:string,
    name?:string,
    style?:any,
    inputRef?:any,
  }, 
  ref:any
)=>{
  const{value, className, cols, 
    onChange, 
    helperText, 
    name,
    style,
    inputRef,
     ...rest
  } = props;
  const classes = useStyles();
  const [medias, setMedias] = React.useState<Array<MediaMeta>>(value? value :[]);


  useEffect(() => {
    setMedias(value? value :[])
  },[value]);
  
  useEffect(() => {
    if(medias !== value && !(!value && medias.length === 0)){
      const event = {
        persist: () => {return {}},
        target: {
          type: "change",
          //id: props.id,
          name: props.name,
          value: medias
        }
      };
 
      //console.log('useEffect', 'medias:', medias, 'value', value)
      onChange && onChange(event);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[medias]);


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
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell><b>Dessert (100g serving)</b></TableCell>
              <TableCell>
                <b>Calories</b>
              </TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  <TextField value={row.name} variant="outlined" size="small" />
                </TableCell>
                <TableCell>
                  <TextField value={row.calories} variant="outlined" size="small" />
                </TableCell>
                <TableCell>
                  <TextField value={row.fat} variant="outlined" size="small" />
                </TableCell>
                <TableCell><TextField value={row.fat} variant="outlined" size="small" /></TableCell>
                <TableCell><TextField value={row.fat} variant="outlined" size="small" /></TableCell>
                <TableCell align="right">
                  <IconButton aria-label="delete"
                    onClick = {(event) => {}}
                  >
                    <DeleteForever fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>    
        <div className={classes.addNewArea}>
          <IconButton onClick={()=>{}} >
            <AddIcon />
          </IconButton>
        </div>
        <div>{helperText}</div>
      </div>
    </Portlet>
  )
})

export default OneToManyTable;
