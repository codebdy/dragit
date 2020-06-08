import React from 'react';
import { FOCUS_NODE, UN_FOCUS_NODE } from '../bus';
import Label from './Label';

export default function ActiveLabel(){
  return (
    <Label showEvent={FOCUS_NODE} hideEvent = {UN_FOCUS_NODE} />
  )
}
