import * as React from 'react';
import { observer } from 'mobx-react';
import './style.css';
import { useRxDragStore } from 'rx-drag/context/useRxDragStore';
import classNames from 'classnames';

export const Sidebar = observer(() => {
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
        <div className = {classNames('rx-sidebar-tab-title', 'actived')}
          style = {
            {
              borderColor:dragStore?.themeOptions.borderColor,
            }
          }
        >组件</div>
        <div className = 'rx-sidebar-tab-title'
          style = {
            {
              borderColor:dragStore?.themeOptions.borderColor,
            }
          }
        >属性</div>
        <div className = 'rx-sidebar-tab-title'
          style = {
            {
              borderColor:dragStore?.themeOptions.borderColor,
            }
          }
        >页面设置</div>
      </div>
      <div className = 'rx-sidebar-tabpanel'>

      </div>
    </div>
  );
})
