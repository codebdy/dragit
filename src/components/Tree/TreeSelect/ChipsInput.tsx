import React, { createRef, useEffect, useRef, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';

interface ChipData {
  key: number;
  label: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      display: 'flex',
    },
    chips: {
      flex: 1,
      display: 'flex',
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: theme.spacing(0.5),
      margin: 0,
    },
    chip: {
      margin: theme.spacing(0.5),
    },
    actions:{
      display:'flex',
      alignItems:'center',
    }
  }),
);

export default function ChipsInput(
  props:{
    onFocus?:(event?: any)=>void,
    onBlur?:(event?: any)=>void,
    value?:Array<number>,
  }
) {

  const {value, onFocus, onBlur} = props;
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const [focused,setFocused] = useState(false);
  const refEl = useRef(null);

  const handleBlur = (event: any)=>{
    let inside = false;
    let domElement = refEl?.current as any;
    let rect = domElement.getBoundingClientRect()
    if(rect.left < event.clientX && rect.right >  event.clientX 
      && rect.top <event.clientY && rect.bottom >  event.clientY){
      inside = true;
    }
    if(!inside){
      setFocused(false);     
    } 
  }

  useEffect(()=>{
    if(focused){
      onFocus&&onFocus();
    }
    else{
      onBlur&&onBlur();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focused])

  useEffect(() => {
    document.addEventListener('mousedown', handleBlur);
    return () => {
      document.removeEventListener('mousedown', handleBlur)
    };
  });

  const handleClick = (event:React.MouseEvent<unknown>)=>{
    setFocused(true);
    event.preventDefault();
    event.stopPropagation();
  }
  

  const [chipData, setChipData] = React.useState<ChipData[]>([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
  ]);

  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  return (
    <div className={classes.root}
      onMouseMove = {()=>setHover(true)}
      onMouseLeave = {()=>setHover(false)}
      onClick = {handleClick}
      ref = {refEl}
    >
      <ul className={classes.chips}>
        {chipData.map((data) => {
          let icon;

          if (data.label === 'React') {
            icon = <TagFacesIcon />;
          }

          return (
            <li key={data.key}>
              <Chip
                icon={icon}
                label={data.label}
                onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                className={classes.chip}
              />
            </li>
          );
        })}
      </ul>
      <div className = {classes.actions}>
        {
          (focused || hover) && (!value || value.length > 0) &&
          <IconButton size="small">
            <CloseIcon fontSize="small"/>
          </IconButton>
        }        
        <IconButton size="small">
          <ArrowDropDownIcon/>
        </IconButton>
      </div>
    </div>
  );
}
