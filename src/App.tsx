import React from 'react';
import Gallery from './components/user-interface/index'
import TodoList from './components/props/index'
import ConditionApp from './components/condition/index'
import RederListApp from './components/render-list/index'

function App() {
  return (
    <div className="App">
      <Gallery />
      <TodoList />
      <ConditionApp />
      <RederListApp/>
    </div>
  );
}

export default App;
