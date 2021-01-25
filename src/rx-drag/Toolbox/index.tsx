import * as React from 'react';
import { observer } from 'mobx-react';
import './style.css';

const svgOutLine = `
  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M15,5H17V3H15M15,21H17V19H15M11,5H13V3H11M19,5H21V3H19M19,9H21V7H19M19,21H21V19H19M19,13H21V11H19M19,17H21V15H19M3,5H5V3H3M3,9H5V7H3M3,13H5V11H3M3,17H5V15H3M3,21H5V19H3M11,21H13V19H11M7,21H9V19H7M7,5H9V3H7V5Z" />
  </svg>
`

const svgPaddingX = `
  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M9,11H15V8L19,12L15,16V13H9V16L5,12L9,8V11M2,20V4H4V20H2M20,20V4H22V20H20Z" />
  </svg>
`
const svgPaddingY = `
  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M13,9V15H16L12,19L8,15H11V9H8L12,5L16,9H13M4,2H20V4H4V2M4,20H20V22H4V20Z" />
  </svg>
`

const svgUndo = `
  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z" />
  </svg>
`
const svgRedo = `
  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M18.4,10.6C16.55,9 14.15,8 11.5,8C6.85,8 2.92,11.03 1.54,15.22L3.9,16C4.95,12.81 7.95,10.5 11.5,10.5C13.45,10.5 15.23,11.22 16.62,12.38L13,16H22V7L18.4,10.6Z" />
  </svg>
`

const svgClear = `
  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M15,16H19V18H15V16M15,8H22V10H15V8M15,12H21V14H15V12M11,10V18H5V10H11M13,8H3V18A2,2 0 0,0 5,20H11A2,2 0 0,0 13,18V8M14,5H11L10,4H6L5,5H2V7H14V5Z" />
  </svg>
`

const svgLeft = `
  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M5,13L9,17L7.6,18.42L1.18,12L7.6,5.58L9,7L5,11H21V13H5M21,6V8H11V6H21M21,16V18H11V16H21Z" />
  </svg>
`

const svgRight = `
  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M21,15.61L19.59,17L14.58,12L19.59,7L21,8.39L17.44,12L21,15.61M3,6H16V8H3V6M3,13V11H13V13H3M3,18V16H16V18H3Z" />
  </svg>
`
export const Toolbox = observer(() => {
  return (
    <div className = 'rx-toolbar'>
      <div className = 'rx-toolbar-button-group'>
        <div 
          dangerouslySetInnerHTML = {{__html:svgOutLine}}
        >
        </div>
        <div 
          dangerouslySetInnerHTML = {{__html:svgPaddingX}}
        >
        </div>      
        <div 
          dangerouslySetInnerHTML = {{__html:svgPaddingY}}
        >
        </div>
        <div 
          dangerouslySetInnerHTML = {{__html:svgUndo}}
        >
        </div>
        <div 
          dangerouslySetInnerHTML = {{__html:svgRedo}}
        >
        </div>
        <div 
          dangerouslySetInnerHTML = {{__html:svgClear}}
        >
        </div>
      </div>
      <div>
        <div 
          dangerouslySetInnerHTML = {{__html:svgLeft}}
        >
        </div>

        <div 
          className = "flip"
          dangerouslySetInnerHTML = {{__html:svgRight}}
        >
        </div>
      </div>
    </div>
  );
})
