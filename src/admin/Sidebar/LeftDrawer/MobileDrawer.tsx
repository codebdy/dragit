import React from 'react';
import { useLeftDrawer } from 'store/helpers/useAppStore';
import StyledDrawer from './StyledDrawer';

export default function MobileDrawer(
  props:{
    children:any,
    open?:boolean,
    onClose?:()=>void,
  }
){
  const {children, open, onClose} = props;
  const leftDrawer = useLeftDrawer();
  return (
    <StyledDrawer
      variant="temporary"
      anchor="left"
      open={open}
      onClose={onClose}
     
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}

      width = {leftDrawer.fullWidth}
      backgroundImage = {leftDrawer.backgroundImage}
      backgroundMask = {leftDrawer.backgroundMask}
    >
      {children}
    </StyledDrawer>
  )
}
