import React, { Fragment, useEffect, useRef, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton, Popover, useTheme } from '@material-ui/core';
import { ITreeNode } from 'base/Model/ITreeNode';
import TreeList from './TreeList';
import { isPointInRect } from 'mock/utils/isPointInRect';
import { remove } from 'utils/ArrayHelper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      width:'100%',
      display: 'flex',
      justifyContent: 'space-between'
    },
    chips: {
      flex: 1,
      display: 'flex',
      flexWrap: 'wrap',
      listStyle: 'none',
      justifyContent:' flex-start',
      alignItems: 'center',
      margin: 0,
      padding:0,
    },
    chip: {
      margin: theme.spacing(0.5),
    },
    actions:{
      display:'flex',
      alignItems:'center',
    },
    treePopover:{
      display:'flex',
      justifyContent:'center',
      padding:theme.spacing(1),
    }
  }),
);

function getNodeById(id:number, rootNodes?:Array<ITreeNode>):ITreeNode|undefined{
  if(!rootNodes){
    return undefined;
  }

  for(let i = 0; i < rootNodes.length; i++){
    if(rootNodes[i].id === id){
      return rootNodes[i];
    }
    let foundChild = getNodeById(id, rootNodes[i].children)
    if(foundChild){
      return foundChild;
    }
  }

  return undefined;
}

export default function ChipsInput(
  props:{
    onFocus?:(event?: any)=>void,
    onBlur?:(event?: any)=>void,
    value?:{
      values?:Array<number>, 
      rootNodes?:Array<ITreeNode>,
      nameKey?:string,
      height?:string,
      size?:any,
      multiSelect?:true,
      isDeisgning?:boolean,
    },
    name?:string,
    itemKey?:string,
    onChange:(value?:any)=>void,
  }
) {

  const {value, name, onFocus, onBlur, onChange} = props;
  const {values, rootNodes, nameKey = 'name', height, size, multiSelect, isDeisgning} = value || {} as any;
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const [focused,setFocused] = useState(false);
  const refEl = useRef(null);
  const refPoperEl = useRef(null);
  const theme = useTheme();

  const handleBlur = (event: any)=>{
    let domElement = refEl?.current as any;
    let rect = domElement.getBoundingClientRect();

    let popDomElement = refPoperEl?.current as any;
    let rect2 = popDomElement?.getBoundingClientRect();
    if(!isPointInRect(event, rect) && !isPointInRect(event, rect2)){
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
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'tree-popover-' + name : undefined;

  const handleClick = (event:React.MouseEvent<HTMLElement>)=>{
    setAnchorEl(event.currentTarget);
    setFocused(true);
    if(!isDeisgning){
      event.preventDefault();
      event.stopPropagation();      
    }
  }

  const handleDelete = (id:number) => () => {
    let valuesCopy = [...values];
    remove(id, valuesCopy);
    onChange(
      {
        target:{
          value:valuesCopy,
        }
      }
    );
  };

  const handleSelectChange = (id:number|undefined, isSelected:boolean)=>{
    let valuesCopy = [...values];
    if(isSelected){
      valuesCopy.push(id);
    }
    else{
      remove(id, valuesCopy)
    }

    if(!multiSelect){
      valuesCopy = [id];
      setFocused(false);
      setAnchorEl(null);    
    }

    onChange(
      {
        target:{
          value:valuesCopy,
        }
      }
    );


  }

  const handleClear = (event:React.MouseEvent<unknown>)=>{
    event.stopPropagation();
    onChange({
      target:{
        value:[],
      }
    });
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getName = (id:number)=>{
    let node = getNodeById(id, rootNodes);
    return node ? node[nameKey] : id;
  }

  return (
    <Fragment>
      <div className={classes.root}
        onMouseMove = {()=>setHover(true)}
        onMouseLeave = {()=>setHover(false)}
        onClick = {handleClick}
        ref = {refEl}
        style={{minHeight:size==="small" ? theme.spacing(4.6) : theme.spacing(6.6)}}
      >
        <ul className={classes.chips}>
          {values && values.map((id:number) => {
            return (
              <li key={id}>
                <Chip
                  label={getName(id)}
                  onDelete={handleDelete(id)}
                  className={classes.chip}
                  size = {size}
                />
              </li>
            );
          })}
        </ul>
        <div className = {classes.actions}>
          {
            (focused || hover) &&
            <IconButton size="small" onClick={handleClear}>
              <CloseIcon fontSize="small"/>
            </IconButton>
          }        
          <IconButton size="small">
            <ArrowDropDownIcon/>
          </IconButton>
        </div>
      </div>
      {
        open && !isDeisgning &&
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <div
            className = {classes.treePopover}
            style={{
              minWidth: Math.round(anchorEl?.getBoundingClientRect().width || 100) + 'px',
              height:height ? height : '300px',
            }}
            ref = {refPoperEl}
          >
            {
              rootNodes && rootNodes.length > 0 ?
              <TreeList 
                selected = {values}
                rootNodes = {rootNodes}
                nameKey = {nameKey}
                multiSelect = {multiSelect}
                onSelectChange = {handleSelectChange}
              />
              :
              "No Data"              
            }

          </div>
        </Popover>       
      }

    </Fragment>
  );
}
