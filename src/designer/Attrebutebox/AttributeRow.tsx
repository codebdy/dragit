import React, { Fragment } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import classNames from 'classnames';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    attrRow:{
      display:'flex',
      flexFlow:'row',
      padding:theme.spacing(0.2, 0),
    },
    rowLabel:{
      color:'#a8afb2',
      padding: theme.spacing(1,0),
      display:'flex',
      alignItems:'center',
      minWidth:'100px',
      cursor:'default',
      userSelect:'none',
    },

    nested:{
      paddingLeft:theme.spacing(2),
    },
    rowArrow:{
      color:'#e0e0e0',
    },
    expandIcon:{
      transform:'rotate(90deg)',
    },
    rowValue:{
      display:'flex',
      alignItems:'center',    
    },

  }),
);

interface RowGroupProps{
  totalLabel:string,
  totalInput:any,
  children:any,
}

export function AttributeRow(props:{children:any}){
  const classes = useStyles();
  return (
      <div className={classes.attrRow}>
        {props.children}
      </div>
  )
}

export function RowLabel(props:{nested?:boolean, onClick?:any, children:any}){
  const classes = useStyles();
  return (
      <div className={ classNames(classes.rowLabel, {[classes.nested]:props.nested}) } onClick= {props.onClick}>
        {props.children}
      </div>
  )
}

export function RowValue(props:{children:any}){
  const classes = useStyles();
  return (
      <div className={classes.rowValue}>
        {props.children}
      </div>
  )
}

export function RowGroup(props:RowGroupProps){
  const classes = useStyles();
  const [expand, setExpand] = React.useState(false);

  const handleClick = ()=>{
    setExpand(!expand)
  }

  return (
    <Fragment>
      <AttributeRow>
        <RowLabel onClick={handleClick}>
          {props.totalLabel} 
          <ArrowRightIcon className={ classNames(classes.rowArrow, {[classes.expandIcon]:expand}) }/>
        </RowLabel>
        <RowValue>
          {props.totalInput}
        </RowValue>
      </AttributeRow>
      {expand && props.children}
    </Fragment>
  )
}