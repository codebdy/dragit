import * as React from 'react';
import { observer } from 'mobx-react';
import './style.css';
import { useRxDragStore } from 'rx-drag/context/useRxDragStore';
import classNames from 'classnames';

export const Sidebar = observer((
  props:{
    toolbox?: JSX.Element,
    attributeBox?: JSX.Element,
    pageSettings?: JSX.Element,
  }
) => {
  const {toolbox, attributeBox, pageSettings} = props;
  const dragStore = useRxDragStore();

  return (
    <div className = 'rx-sidebar'>
      <div 
        className = 'rx-sidebar-tabs'
        style = {
          {
            borderColor:dragStore?.themeOptions.borderColor,
          }
        }
      >
        <div className = {
            classNames(
              'rx-sidebar-tab-title', 
              {'actived':dragStore?.activedTab === 'toolbox'}
            )
          }
          style = {
            {
              borderColor:dragStore?.themeOptions.borderColor,
            }
          }
          onClick = {()=>dragStore?.setActiveTab('toolbox')}
        >
          {dragStore?.locales?.components || 'Components'}
        </div>
        <div className = {
            classNames(
              'rx-sidebar-tab-title', 
              {'actived':dragStore?.activedTab === 'attributes'}
            )
          }        
          style = {
            {
              borderColor:dragStore?.themeOptions.borderColor,
            }
          }
          onClick = {()=>dragStore?.setActiveTab('attributes')}
        >
          {dragStore?.locales?.attributes || 'Attributes'}
        </div>
        <div className = {
            classNames(
              'rx-sidebar-tab-title', 
              {'actived':dragStore?.activedTab === 'settings'}
            )
          }  
          style = {
            {
              borderColor:dragStore?.themeOptions.borderColor,
            }
          }
          onClick = {()=>dragStore?.setActiveTab('settings')}
        >
          {dragStore?.locales?.pageSettings || 'Page settings'}
        </div>
      </div>
      <div className = 'rx-sidebar-tabpanel'>
        {
          dragStore?.activedTab === 'toolbox' && toolbox
        }
        {
          dragStore?.activedTab === 'attributes' && attributeBox
        }
        {
          dragStore?.activedTab === 'settings' && pageSettings
        }

      </div>
    </div>
  );
})
