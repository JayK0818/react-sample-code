import React from 'react';
import Gallery from './components/user-interface/index'
import TodoList from './components/props/index'
import ConditionApp from './components/condition/index'
import RederListApp from './components/render-list/index'
import EventApp from './components/event/index'
import StateApp from './components/state/index'
import StateManagement from './components/state-management/index'
import StateShareApp from './components/state-share/index'
import StateRetentionResetApp from './components/state-retention-reset/index'
import UseRefApp from './components/hooks/ref'
import TodoApp from './components/hooks/reducer'
import UseMemoApp from './components/hooks/useMemo'
import CustomHookApp from './components/hooks/customHook'

function App() {
  return (
    <div className="App">
      <Gallery />
      <TodoList />
      <ConditionApp />
      <RederListApp />
      <EventApp />
      <StateApp />
      <StateManagement />
      <StateShareApp />
      <hr />
      <StateRetentionResetApp />
      <hr />
      <UseRefApp />
      <hr />
      <TodoApp />
      <hr />
      <UseMemoApp />
      <CustomHookApp/>
    </div>
  );
}

export default App;
