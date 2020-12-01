import React from 'react';
import { makeStyles, Theme, createStyles} from '@material-ui/core';
import { RXInputProps } from 'base/RXInputProps';
import Portlet from 'components/Portlet';
import { creatSubModel, SubModelContext } from './SubModelContext';

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
    error?:any,
    helperText?:string,
  },
  ref:any
)=>{
  const {name, loading, value, title, withHeader, error, helperText, children, onChange, ...rest} = props;
  const classes = useStyles();
  
  return (
    <Portlet 
      ref={ref}
      title = {title}
      withHeader = {withHeader}
      {...rest}
    >
      <div className={classes.body}>
        <SubModelContext.Provider value={creatSubModel(name, value)}>
          {children}
        </SubModelContext.Provider>
      </div>
    </Portlet>
  )
})

export default OneToOnePortlet