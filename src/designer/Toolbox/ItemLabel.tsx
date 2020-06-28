import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import MdiIcon from 'components/common/MdiIcon';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    treeItemLabel: {
      fontSize:'0.9rem',
      padding:theme.spacing(1,0),
      cursor:'default',
    },

    title:{
      paddingLeft:theme.spacing(1),
    }

  }),
);

export default function ItemLabel(props:{isLeaf?:boolean, title:string}){
  const {isLeaf,title } = props
  const classes = useStyles();
  return (
    <div className={classes.treeItemLabel} style={{marginLeft:isLeaf ? '-16px' :''}}>
      {isLeaf && <MdiIcon iconClass="mdi-file" color="#6e808c" size={12}/>}
      <span className={classes.title}> 
      {title}
      </span>
    </div>
  )
}
