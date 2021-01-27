import * as React from 'react';
import { observer } from 'mobx-react';
import './style.css';
import classNames from 'classnames';
import { useRxDragShellStore } from 'rx-drag/store/useRxDragShellStore';
import { ToolbarButton } from './ToolbarButton';
import { DARK, LIGHT, RxThemeMode } from 'rx-drag/store/IRxThemeOptions';

const svgOutLine = `
  <svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M15,5H17V3H15M15,21H17V19H15M11,5H13V3H11M19,5H21V3H19M19,9H21V7H19M19,21H21V19H19M19,13H21V11H19M19,17H21V15H19M3,5H5V3H3M3,9H5V7H3M3,13H5V11H3M3,17H5V15H3M3,21H5V19H3M11,21H13V19H11M7,21H9V19H7M7,5H9V3H7V5Z" />
  </svg>
`

const svgPaddingX = `
  <svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M9,11H15V8L19,12L15,16V13H9V16L5,12L9,8V11M2,20V4H4V20H2M20,20V4H22V20H20Z" />
  </svg>
`
const svgPaddingY = `
  <svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M13,9V15H16L12,19L8,15H11V9H8L12,5L16,9H13M4,2H20V4H4V2M4,20H20V22H4V20Z" />
  </svg>
`

const svgUndo = `
  <svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z" />
  </svg>
`
const svgRedo = `
  <svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M18.4,10.6C16.55,9 14.15,8 11.5,8C6.85,8 2.92,11.03 1.54,15.22L3.9,16C4.95,12.81 7.95,10.5 11.5,10.5C13.45,10.5 15.23,11.22 16.62,12.38L13,16H22V7L18.4,10.6Z" />
  </svg>
`

const svgClear = `
  <svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M15,16H19V18H15V16M15,8H22V10H15V8M15,12H21V14H15V12M11,10V18H5V10H11M13,8H3V18A2,2 0 0,0 5,20H11A2,2 0 0,0 13,18V8M14,5H11L10,4H6L5,5H2V7H14V5Z" />
  </svg>
`

const svgLight = `
  <svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8M12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z" />
  </svg>
`
const svgDark = `
  <svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M12,18C11.11,18 10.26,17.8 9.5,17.45C11.56,16.5 13,14.42 13,12C13,9.58 11.56,7.5 9.5,6.55C10.26,6.2 11.11,6 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z" />
  </svg>
`

const svgLeft = `
  <svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M5,13L9,17L7.6,18.42L1.18,12L7.6,5.58L9,7L5,11H21V13H5M21,6V8H11V6H21M21,16V18H11V16H21Z" />
  </svg>
`

const svgRight = `
  <svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M21,15.61L19.59,17L14.58,12L19.59,7L21,8.39L17.44,12L21,15.61M3,6H16V8H3V6M3,13V11H13V13H3M3,18V16H16V18H3Z" />
  </svg>
`
export const Toolbar = observer((
  props:{
    onThemeModeChange?:(mode :RxThemeMode)=>void,
  }
) => {
  const {onThemeModeChange} = props;
  const handleModeChange = ()=>{
    dragStore?.toggleThemeMode();
    onThemeModeChange && onThemeModeChange(dragStore?.themeOptions.mode || LIGHT)
  }
  const dragStore = useRxDragShellStore();
  return (
    <div 
      className = {classNames('rx-toolbar', 'rx-toolbar-color')}
      style = {
        {
          borderColor:dragStore?.themeOptions.borderColor,
        }
      }
    >
      <div className = 'rx-toolbar-button-group'>
        <ToolbarButton svgIcon = {svgOutLine} />
        <ToolbarButton svgIcon = {svgPaddingX} checked />
        <ToolbarButton svgIcon = {svgPaddingY} />
        <ToolbarButton svgIcon = {svgUndo} />
        <ToolbarButton svgIcon = {svgRedo} disabled />
        <ToolbarButton svgIcon = {svgClear} />
      </div>
      <div className = 'rx-toolbar-button-group'>
        {
          dragStore?.themeOptions.canSwitchThemeMode && 
          <ToolbarButton 
            svgIcon = {dragStore?.themeOptions.mode === DARK ? svgLight : svgDark} 
            onClick = {handleModeChange}
          />        
        }

        <ToolbarButton 
          svgIcon = { dragStore?.rightFolded ? svgLeft : svgRight} 
          className = { dragStore?.rightFolded ? '' : 'flip'} 
          onClick = {()=>{dragStore?.setRightFolded(!dragStore?.rightFolded)}}
        />
      </div>
    </div>
  );
})
