import React from 'react';
import MuiIconButton from '@material-ui/core/IconButton';
import MdiIcon from 'Components/Common/MdiIcon';
import { Tooltip } from '@material-ui/core';

const IconButton = React.forwardRef((
    props:{
      size?:'medium' | 'small',
      icon?:string, 
      iconColor?:string,
      tooltip?:string,
    }, 
    ref:any
  )=>{

  const {
    size,
    icon,
    iconColor,
    tooltip,
    ...rest
  } = props
  
  let iconSize = 16;
  if(size === 'small'){
    iconSize = 14;
  }

  const btn = <MuiIconButton
      size = {size} 
      {...rest} 
      ref= {ref} 
    ><MdiIcon iconClass={icon} size={iconSize} color={iconColor}/></MuiIconButton>

  return (
    tooltip
    ? <Tooltip title={tooltip} aria-label={tooltip}>{btn}</Tooltip>
    : btn
  );
})

export default IconButton;

