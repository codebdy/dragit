import React from 'react';
import { makeStyles, Theme, createStyles} from '@material-ui/core';
import { RXInputProps } from 'base/RXInputProps';
import Portlet from 'components/Portlet';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
    },
  }),
);

const OneToOnePortlet = React.forwardRef((
  props: RXInputProps& {
    value?:Array<any>,   
    title?:string,
    children?:any,
    style?:any,
    withHeader:boolean,
  },
  ref:any
)=>{
  const {name, loading, value, title, withHeader, children, onChange, ...rest} = props;
  const classes = useStyles();
  
  return (
    <Portlet 
      ref={ref}
      withHeader = {withHeader}
      {...rest}
    >
      <div className={classes.body}>
        {children}
      </div>
    </Portlet>
  )
})

export default OneToOnePortlet