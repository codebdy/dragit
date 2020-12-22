import React from 'react';
import { Hidden } from '@material-ui/core';
import { Fragment } from 'react';
import { PCDrawer } from './PCDrawer';
import { MobileDrawer } from './MobileDrawer';

export default function LeftDrawer(
  props:{
    children:any,
  }
){
  const {children} = props;
  return (
    <Fragment>
      <Hidden mdUp>
        <MobileDrawer >
        
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
