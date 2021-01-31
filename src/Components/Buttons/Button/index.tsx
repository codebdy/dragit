import React from 'react';
import MuiButton from '@material-ui/core/Button';
import MdiIcon from 'Components/utils/MdiIcon';


const Button = React.forwardRef((
    props:{
      size?:'large' | 'medium' | 'small',
      startIcon?:string, 
      endIcon?:string
    }, 
    ref:any
  )=>{

  const {
    size,
    startIcon,
    endIcon,
    ...rest
  } = props
  
  let iconSize = 16;
  if(size === 'large'){
    iconSize = 18;
  }
  if(size === 'small'){
    iconSize = 14;
  }

  return (
    <MuiButton
      size = {size} 
      {...rest} 
      ref= {ref} 
      startIcon = {startIcon? <MdiIcon iconClass={startIcon} size={iconSize}/> : ''}
      endIcon = {endIcon? <MdiIcon iconClass={endIcon} /> : ''}
    ></MuiButton>
  );
})

export default Button;

