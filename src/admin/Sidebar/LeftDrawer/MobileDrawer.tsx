import React from 'react';
import { useLeftDrawer, useThemeSettings } from 'store/helpers/useAppStore';
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
  const themeSettings = useThemeSettings();
  
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
      backgroundImage = {themeSettings.leftDrawerSkin.image}
      backgroundMask = {themeSettings.leftDrawerSkin.mask}
    >
      {children}
    </StyledDrawer>
  )
}
