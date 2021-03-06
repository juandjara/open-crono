import axios from 'services/axiosWrapper'
import { browserHistory } from 'react-router'
import createPaginator from 'services/createPaginator'
import { combineReducers } from 'redux'

const endpoint = "/project"
const paginator = createPaginator(endpoint)
//const paginator = createPaginator(`${endpoint}/by_principal`)

// SELECTORS
export const getProjectsPage = state => paginator.selectors.pageSelector(
  state.projects.pagination,
  state.projects.entities
)
export const getProjectById = (state, id) => state.projects.entities[id] || {missing: true}

// ACTION TYPES
export const PROJECTS_FETCH = paginator.types.FETCH_PAGE
export const PROJECT_FETCH = "PROJECT_FETCH"
export const PROJECT_UPDATE = "PROJECT_UPDATE"
export const PROJECT_CREATE = "PROJECT_CREATE"
export const PROJECT_DELETE = "PROJECT_DELETE"

// ACTION CREATORS

// receives page and page size
// and dispatches actions to fetch a page from the list of users
export const fetchProjectsPage = (page, size, isAdmin) => {
  const suffix = isAdmin ? '' : 'by_principal'
  return paginator.actions.fetchPage(page, size, suffix)
}

// receives project id
// and dispatches actions to fetch the project
export function fetchSingleProject(id) {
  const promise = axios.get(`${endpoint}/${id}`).then(res => res.data)
  return {
    type: PROJECT_FETCH,
    payload: {data: {id}, promise}
  }
}

// checks if given user is loaded and dispatches action to load it if not
export const fetchProjectIfNeeded = id => (dispatch, getState) => {
  if(!getProjectById(getState(), id)) {
    return dispatch(fetchSingleProject(id))
  }
}

// receive project, send data to backend,
// and dispatch the related actions
export function editProject(project, isEditMode) {
  const promise = axios({
    method: isEditMode ? 'put':'post',
    url: isEditMode ? `${endpoint}/${project._id}` : endpoint,
    data: project
  }).then(res => res.data)
  promise.then(() => {
    browserHistory.push('/projects')
  })
  return {
    meta: {_id: project._id},
    type: isEditMode ? PROJECT_UPDATE : PROJECT_CREATE,
    payload: {data: project, promise}
  }
}

// receives project, deletes data in backend,
// and dispatch the related actions
export const deleteProject = project => {
  const promise = axios.delete(`${endpoint}/${project._id}`)
  .then(() => project)
  return {
    type: PROJECT_DELETE,
    payload: {data: project, promise}
  }
}

// REDUCER
const projectsReducer = (state = {}, action = {}) => {
  const {type, payload = {}, meta = {}} = action
  switch (type) {
    case `${PROJECT_FETCH}_LOADING`:
    case `${PROJECT_UPDATE}_LOADING`:
    case `${PROJECT_CREATE}_LOADING`:
    case `${PROJECT_DELETE}_LOADING`:
      return {
        ...state,
        [payload._id]: {
          ...state[payload._id], 
          loading: true
        }
      }
    case `${PROJECT_FETCH}_SUCCESS`:
    case `${PROJECT_CREATE}_SUCCESS`:
    case `${PROJECT_UPDATE}_SUCCESS`:
      return {
        ...state,
        [payload._id]: payload
      }
    case `${PROJECT_DELETE}_SUCCESS`:
      const copy = {...state}
      delete copy[payload._id]
      return copy
    case `${PROJECT_FETCH}_ERROR`:
    case `${PROJECT_UPDATE}_ERROR`:
    case `${PROJECT_CREATE}_ERROR`:
    case `${PROJECT_DELETE}_ERROR`:
      return {
        ...state,
        [meta._id]: {
          ...state[meta._id],
          loading: false
        }
      }
    default:
      return paginator.reducers.items(state, action);
  }
}

export default combineReducers({
  entities: projectsReducer,
  pagination: paginator.reducers.pagination
})
