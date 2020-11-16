import React from 'react';
import { ACTIVE_NODE, UN_ACTIVE_NODE } from '../bus';
import Label from './Label';

export default function ActiveLabel(){
  return (
    <Label showEvent={ACTIVE_NODE} hideEvent = {UN_ACTIVE_NODE} />
  )
}
