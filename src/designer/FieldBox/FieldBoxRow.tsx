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
      editing:boolean, 
      onSelected:()=>void,
      onEditing:(editing:boolean)=>void,
      onRemove:()=>void,
      onNameChange:(newName:string)=>void
    }
  ){
  const {field, selected, editing, onSelected, onEditing, onRemove, onNameChange} = props;
  const classes = useStyles();
  const [hover, setHover] = React.useState(false);

  const handleRemoveClick = (event:React.MouseEvent<unknown>)=>{
    onRemove();
    event.stopPropagation()
  };
  const handleFieldChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onNameChange((event.target.value as string).trim())
  };

  return (
    <div className={classNames(classes.row, {[classes.selected]:selected})} 
      onClick={()=>onSelected()}
      onMouseOver = {()=>setHover(true)}
      onMouseLeave = {()=>setHover(false)}
    >
      { 
        editing?
        <input className = { classNames(classes.input) } 
        value={field}
        onBlur = {()=>onEditing(false)}
        autoFocus = {true}
        onChange = {handleFieldChange}
        />
        :
        <div className = {classNames(classes.leftInput, classes.text)}
          onClick = {()=>{selected&&onEditing(true)}}
        >{field}</div>
      }
      {
        (hover || selected)&&
        <div>
          <IconButton size="small" className = {classes.more}
            onClick = {()=>{onEditing(true)}}
          ><MdiIcon iconClass = "mdi-pencil" size={12} /></IconButton>
          <IconButton size="small" className = {classes.more}
            onClick = {handleRemoveClick}
          ><MdiIcon iconClass = "mdi-close" size={12} /></IconButton>
        </div>
      }
    
    </div>
  )
}
