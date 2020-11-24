import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import MutiContentPotlet from 'components/common/MutiContentPotlet';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
    },

  }),
);

const OneToManyPortlet = React.forwardRef((
  props:{
    title?:string,
  },
  ref:any
)=>{
  const {title,...rest} = props;
  const classes = useStyles();
  const handleAddNew = ()=>{

  }

  return (
    <MutiContentPotlet title={title} ref={ref} {...rest}
      onAddNew = {handleAddNew}
    >
      ddd
    </MutiContentPotlet>
  )
})

export default OneToManyPortlet