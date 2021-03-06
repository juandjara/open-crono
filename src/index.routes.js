import React from 'react'
import { IndexRedirect, Route } from 'react-router'

import {App} from 'components/pages/app'
import {Login} from 'components/pages/login'
import NotFound from 'components/shared/NotFound'

import {ProfileForm} from 'components/pages/profile'
import {UserList, UserForm} from 'components/pages/users'
import {ClientList, ClientForm} from 'components/pages/clients'
import {ProjectList, ProjectForm, ProjectUser} from 'components/pages/projects'
import TaskList from 'components/pages/tasks/TaskList'
import TaskForm from 'components/pages/tasks/TaskForm'
import TaskTimeList from 'components/pages/tasks/TaskTimeList'
import Dashboard from './components/pages/dashboard/Dashboard'

import { requireAuth } from 'services/authService';

export default (store) => {
  return [
    <Route path="/" component={App} onEnter={requireAuth(store)}>
      <IndexRedirect to="/projects" />
      <Route path="projects" component={ProjectList} />
      <Route path="projects/:_id" component={ProjectForm} />
      <Route path="projects/:_id/users" component={ProjectUser} />

      <Route path="projects/:projectId/tasks" component={TaskList} />
      <Route path="tasks/:_id" component={TaskForm} />
      <Route path="tasks/:_id/times" component={TaskTimeList} />

      <Route path="users" component={UserList} />
      <Route path="users/:_id" component={UserForm} />
      
      <Route path="clients" component={ClientList} />
      <Route path="clients/:_id" component={ClientForm} />      
      
      <Route path="profile" component={ProfileForm} />
      <Route path="dashboard" component={Dashboard} />
    </Route>,
    <Route path="/login" component={Login} />,
    <Route path="*" component={NotFound} />
  ]
}
