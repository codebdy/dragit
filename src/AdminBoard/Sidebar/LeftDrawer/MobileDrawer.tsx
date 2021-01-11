import React from 'react';
import { StyledDrawer } from './StyledDrawer';
import {observer} from 'mobx-react-lite';
import { useLeftDrawer } from 'Store/Helpers/useAppStore';

export const MobileDrawer = observer((
  props:{
    children:any,
  }
)=>{
  const {children} = props;
  const leftDrawer = useLeftDrawer();
  const handleClose = ()=>{
    leftDrawer.closeOnMobile();
  }

  return (
    <StyledDrawer
      variant="temporary"
      anchor="left"
      open={leftDrawer.mobileOpen}
      onClose={handleClose}
     
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}

      width = {leftDrawer.fullWidth}
    >
      {children}
    </StyledDrawer>
  )
})
