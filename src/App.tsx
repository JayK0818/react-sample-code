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
// import TodoApp from './components/hooks/reducer'
import UseMemoApp from './components/hooks/useMemo'
import CustomHookApp from './components/hooks/customHook'
import ClassNameApp from './components/class-name/index'
import ClassModuleApp from './components/class-module/index'
import NestRouterApp from './components/router/nested-router'
import DynamicRouterApp from './components/router/dynamic-router'
import BaseRouterApp from './components/router/index'
import ActiveLinkApp from './components/router/active-link'
import DataLoadingApp from './components/router/data-loading'
import RedirectRouterApp from './components/router/redirect'
import PendingNavigateApp from './components/router/pending-navigation'
// import { useNavigation } from 'react-router-dom'
// import DeferSuspenseApp from './components/router/defer-suspense'
import DataMutationApp from './components/router/data-mutation'
import 'antd/dist/reset.css'
// import ReactRouterApp from './components/react-router-app/index'
import CreateBrowserRouterApp from './components/router/create-browser-router'
// import CreateHashRouterApp from './components/router/create-hash-router'
// import HighOrderComponent from './components/high-order-component/index'
// import CounterContextComponent from './components/context/index'
import ReduxApp from './components/redux'
import FixedTable from './components/fixed-table'
// import RouterProtectApp from './components/router-protect'
// import FormApp from './components/form/index'
// import TodoApp from './components/redux/components/reselect'
import RefApp from './components/ref/index'
// import TasksApp from './components/hooks/context-with-reducer'
import ThunkApp from './components/redux/components/thunk'

function App() {
  return (
    <div className="App">
      {/* <DataMutationApp/> */}
      {/* <ActiveLinkApp/> */}
      {/* <NestRouterApp /> */}
      {/* <DynamicRouterApp/> */}
      {/* <PendingNavigateApp/> */}
{/*       <BaseRouterApp/>
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
      <CustomHookApp />
      <ClassNameApp /> */}
      {/* <ClassModuleApp/> */}
{/*       <ReduxApp />
      <FixedTable/> */}
      {/* <RefApp/> */}
      <ThunkApp/>
    </div>
  );
}

export default App;
