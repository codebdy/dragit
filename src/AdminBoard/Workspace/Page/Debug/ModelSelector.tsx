import React, { Fragment } from 'react';
import { useAppStore } from 'Store/Helpers/useAppStore';
import {observer} from 'mobx-react';

export const ModelSelector = observer(() => {
  const appStore = useAppStore();

  console.log('ModelSelector', appStore.selectModelComponentRxid)

  return (
    appStore.selectModelComponentRxid 
    ? <div></div>
    : <Fragment></Fragment>
  );
})
