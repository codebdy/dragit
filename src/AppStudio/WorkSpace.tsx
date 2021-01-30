import * as React from 'react';
import { observer } from 'mobx-react';
import { RxPageEditor } from './RxPageEditor';
import { RxNavigationEditor } from './RxNavigationEditor';
import { Redirect, Route, Switch } from 'react-router-dom';

export const WorkSpace = observer(() => {

  return (
    <Switch>
      <Route path="/app-studio/:appId/page/:pageId?" component={RxPageEditor}></Route> 
      <Route path="/app-studio/:appId/navigation/" component={RxNavigationEditor}></Route>
      <Redirect to={`/app-studio/:appId/page/`} from='/app-studio/:appId/' /> 
    </Switch>
  );
})
