import * as React from 'react';
import { observer } from 'mobx-react';
import './style.css';
import { useRxDragStore } from 'rx-drag/context/useRxDragStore';
import classNames from 'classnames';
import intl from 'react-intl-universal';

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
          {intl.get('component')}
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
          {intl.get('attributes')}
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
          {intl.get('page-settings')}
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
