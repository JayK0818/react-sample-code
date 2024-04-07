import React from 'react';
import Gallery from './components/user-interface/index'
import TodoList from './components/props/index'
import ConditionApp from './components/condition/index'
import RederListApp from './components/render-list/index'
import EventApp from './components/event/index'
import StateApp from './components/state/index'
import StateManagement from './components/state-management/index'
import StateShareApp from './components/state-share/index'

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
      <StateShareApp/>
    </div>
  );
}

export default App;
