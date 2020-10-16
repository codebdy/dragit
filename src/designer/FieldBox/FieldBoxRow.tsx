import React from 'react';
import { makeStyles, Theme, createStyles, IconButton } from '@material-ui/core';
import classNames from 'classnames';
import MdiIcon from 'components/common/MdiIcon';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    row:{
      display:'flex',
      flexFlow:'row',
      padding:'3px',
      width:"100%",
      height:theme.spacing(4),
      alignItems:"center",      
    },
    selected:{
      background:'rgba(255,255,255,0.15)',
    },
    text:{
      cursor:"default",
      display:"flex",

    },
    input:{
      background:'rgba(0,0,0,0.15)', 
      outline:'0', 
      border:'1px', 
      color:'#fff', 
      borderRadius:'3px',
    },
    leftInput:{
      flex:1,
    },
    rightInput:{
      width:'60px',
    },
    more:{
      width:'24px',
      height:'24px',
    },
  }),
);

export default function FieldBoxRow(
    props:{field:string,
      selected:boolean, 
      onSelected:()=>void,
      onRemove:()=>void,
      onNameChange:(newName:string)=>void
    }
  ){
  const {field, selected, onSelected, onRemove, onNameChange} = props;
  const classes = useStyles();
  const [hover, setHover] = React.useState(false);
  const [eidting, setEditing] = React.useState(false);

  const handleRemoveClick = (event:React.MouseEvent<unknown>)=>{
    onRemove();
    event.stopPropagation()
  };
  const handleFieldChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onNameChange((event.target.value as string).trim())
    //items[index].name = (event.target.value as string).trim();
    //setItems([...items]);
    //props.onChange(toStyles(items));
  };

  return (
    <div className={classNames(classes.row, {[classes.selected]:selected})} 
      onClick={()=>onSelected()}
      onMouseOver = {()=>setHover(true)}
      onMouseLeave = {()=>setHover(false)}
    >
      { 
        eidting?
        <input className = { classNames(classes.input) } 
        value={field}
        onBlur = {()=>setEditing(false)}
        autoFocus = {true}
        onChange = {handleFieldChange}
        />
        :
        <div className = {classNames(classes.leftInput, classes.text)}
          onClick = {()=>{selected&&setEditing(true)}}
        >{field}</div>
      }
      {
        (hover || selected)&&
        <div>
          <IconButton size="small" className = {classes.more}> <MdiIcon iconClass = "mdi-dots-horizontal" size={12} /> </IconButton>
          <IconButton size="small" className = {classes.more}
            onClick = {()=>{setEditing(true)}}
          ><MdiIcon iconClass = "mdi-pencil" size={12} /></IconButton>
          <IconButton size="small" className = {classes.more}
            onClick = {handleRemoveClick}
          ><MdiIcon iconClass = "mdi-close" size={12} /></IconButton>
        </div>
      }
    
    </div>
  )
}
