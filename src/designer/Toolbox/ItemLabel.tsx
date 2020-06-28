import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import MdiIcon from 'components/common/MdiIcon';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    treeItemLabel: {
      fontSize:'0.9rem',
      padding:theme.spacing(1,0),
    },

  }),
);

export default function ItemLabel(props:{isLeaf?:boolean, title:string}){
  const {isLeaf,title } = props
  const classes = useStyles();
  return (
    <div className={classes.treeItemLabel} style={{marginLeft:isLeaf ? '-16px' :''}}>
      {isLeaf && <MdiIcon iconClass="mdi-file"  size={12}/>}
      {title}
    </div>
  )
}
