import React from 'react';
import { makeStyles, Theme, createStyles, IconButton } from '@material-ui/core';
import Portlet from 'Components/Portlet';
import AddIcon from '@material-ui/icons/Add';
import classNames from 'classnames';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
    },
    addNewArea:{
      display:'flex',
      justifyContent:'center',
      padding:theme.spacing(1),
    },
    helperText:{
      padding:theme.spacing(1),
    },
    error:{
      color:'red',
    }
  }),
);

const MultiContentPotlet = React.forwardRef((
  props:{
    title?:string,
    withHeader?:boolean,
    onAddNew:()=>void,
    helperText?:string,
    children?:any,
    error?: any,
  },
  ref:any
)=>{
  const {withHeader = true, onAddNew, helperText, error, children, ...rest} = props;
  const classes = useStyles();
  return (
    <Portlet 
      ref={ref}
      withHeader = {withHeader}
      {...rest}
    >

      <div className={classes.body}>
        {children}
        <div className={classes.addNewArea}>
          <IconButton onClick={onAddNew} >
            <AddIcon />
          </IconButton>
        </div>
        {helperText && <div className={classNames(classes.helperText, {[classes.error]:error})}>{helperText}</div>}
      </div>
    </Portlet>

  )
})

export default MultiContentPotlet