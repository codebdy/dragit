import * as React from 'react';
import { observer } from 'mobx-react';
import { useRxDragShellStore } from 'rx-drag/store/useRxDragShellStore';
import classNames from 'classnames';
import './style.css';
import { useRxDragStore } from 'rx-drag/store/useDesign';
import { useEffect } from 'react';

export const Sidebar = observer((
  props:{
    toolbox?: JSX.Element,
    attributeBox?: JSX.Element,
    pageSettings?: JSX.Element,
  }
) => {
  const {toolbox, attributeBox, pageSettings} = props;
  const dragShellStore = useRxDragShellStore();
  const rxDragStore = useRxDragStore();

  useEffect(()=>{
    if(rxDragStore?.selectedNode){
      dragShellStore?.setActiveTab('attributes');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[rxDragStore?.selectedNode])

  return (
    <div className = 'rx-sidebar'>
      <div 
        className = 'rx-sidebar-tabs'
        style = {
          {
            borderColor:dragShellStore?.themeOptions.borderColor,
          }
        }
      >
        <div className = {
            classNames(
              'rx-sidebar-tab-title', 
              {'actived':dragShellStore?.activedTab === 'toolbox'}
            )
          }
          style = {
            {
              borderColor:dragShellStore?.themeOptions.borderColor,
            }
          }
          onClick = {()=>dragShellStore?.setActiveTab('toolbox')}
        >
          {dragShellStore?.locales?.components || 'Components'}
        </div>
        <div className = {
            classNames(
              'rx-sidebar-tab-title', 
              {'actived':dragShellStore?.activedTab === 'attributes'}
            )
          }        
          style = {
            {
              borderColor:dragShellStore?.themeOptions.borderColor,
            }
          }
          onClick = {()=>dragShellStore?.setActiveTab('attributes')}
        >
          {dragShellStore?.locales?.attributes || 'Attributes'}
        </div>
        <div className = {
            classNames(
              'rx-sidebar-tab-title', 
              {'actived':dragShellStore?.activedTab === 'settings'}
            )
          }  
          style = {
            {
              borderColor:dragShellStore?.themeOptions.borderColor,
            }
          }
          onClick = {()=>dragShellStore?.setActiveTab('settings')}
        >
          {dragShellStore?.locales?.pageSettings || 'Page settings'}
        </div>
      </div>
      <div className = 'rx-sidebar-tabpanel'>
        {
          dragShellStore?.activedTab === 'toolbox' && toolbox
        }
        {
          dragShellStore?.activedTab === 'attributes' && attributeBox
        }
        {
          dragShellStore?.activedTab === 'settings' && pageSettings
        }

      </div>
    </div>
  );
})
