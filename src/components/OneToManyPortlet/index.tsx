import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import Portlet from 'components/Portlet';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position:'absolute',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width:'100%',
      height:'100%',
    },

  }),
);

const OneToManyPortlet = React.forwardRef((
  props:{
    title?:string,
    withHeader?:string
  },
  ref:any
)=>{
  const {title, withHeader=true, ...rest} = props;
  const classes = useStyles();
  return (
    <Portlet title={title} withHeader {...rest}>
      ddd
    </Portlet>
  )
})

export default OneToManyPortlet