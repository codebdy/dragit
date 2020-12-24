import React from 'react';
import { Switch } from '@material-ui/core';
import Brand from '../SidebarBrand';
import { useLeftDrawer } from 'store/helpers/useAppStore';
import {StyledDrawer} from './StyledDrawer';
import {observer} from "mobx-react-lite";

export const PCDrawer = observer((
  props:{
    children:any,
  }
)=>{
  const {children} = props;
  const leftDrawer = useLeftDrawer();

  const handleMouseEnter = ()=>{
    leftDrawer.mouseEnter();
  }

  const handleMouseLeave = ()=>{
    leftDrawer.mouseOut();
  }

  const handleToggle = ()=>{
    leftDrawer.toggleCompactable();
  }

  return (
    <StyledDrawer
      variant = "permanent"
      open
      onMouseEnter = { handleMouseEnter }
      onMouseLeave = { handleMouseLeave }
      width = {leftDrawer.hover ? leftDrawer.fullWidth : leftDrawer.width}
      elevation = {leftDrawer.compactable ? 20 : 0}
      showBorder = {!leftDrawer.compactable}
    >
      <Brand fullWidth={leftDrawer.fullWidth}>
        <Switch 
          color = "primary"
          checked={!leftDrawer.compactable}
          onClick = {handleToggle} 
          size = "small"
        />
      </Brand>
      {children}
    </StyledDrawer>

  )
})
