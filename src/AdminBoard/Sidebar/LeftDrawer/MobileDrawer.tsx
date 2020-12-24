import React from 'react';
import { useLeftDrawer } from 'store/helpers/useAppStore';
import { StyledDrawer } from './StyledDrawer';
import {observer} from 'mobx-react-lite';

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
