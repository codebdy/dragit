import React from 'react';
import { Hidden } from '@material-ui/core';
import { Fragment } from 'react';
import { PCDrawer } from './PCDrawer';
import MobileDrawer from './MobileDrawer';

export default function LeftDrawer(
  props:{
    mobileOpen?:boolean,
    onMobileClose?: ()=>void,
    children:any,
  }
){
  const {mobileOpen, onMobileClose, children} = props;
  return (
    <Fragment>
      <Hidden mdUp>
        <MobileDrawer
          open={mobileOpen}
          onClose={onMobileClose}
        >
        
          {children}
        </MobileDrawer>
      </Hidden>
      
      <Hidden smDown>
        <PCDrawer>
          {children}
        </PCDrawer>
      </Hidden>
    </Fragment>
  )
}
