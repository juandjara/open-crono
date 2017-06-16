import { toast } from 'react-toastify';
import React from 'react';
import axios from '../utils/axiosWrapper';

// action types
export const PROFILE_FETCH = "PROFILE_FETCH"

export const PROFILE_UPDATE = "PROFILE_UPDATE"
export const PROFILE_UPDATE_FIELD = "PROFILE_UPDATE_FIELD"

const ToastBody = ({text}) => (
  <p style={{
    background: '#333',
    color: 'white'
  }}>{text}</p>
)

const errMapper = res => res.data && res.data.error.message

// action creators
export function fetchProfile() {
  const payload = Promise.all([
    axios.get('/account'),
    axios.get('/account/data')
  ]).then(res => {
    return res.reduce((prev, next) => Object.assign(prev, next.data), {})
  })
  return { payload, type: PROFILE_FETCH }
}

export function updateProfileField(name, value) {
  return { name, value, type: PROFILE_UPDATE_FIELD }
}

export function saveProfile(profile) {
  const promise = axios.put(`/user/id/${profile.id}`, profile);
  promise.then(() => toast.success(<ToastBody text="Perfil guardado" />))
  .catch(res => {
    const error = `${res.status} ${res.statusText}`;
    toast.error(<ToastBody text={error} />)
  })
  return {
    type: PROFILE_UPDATE,
    payload: promise
  }
}

// reducer
export default (state = {loading: false}, action) => {
  switch (action.type) {
    case `${PROFILE_FETCH}_LOADING`:
    case `${PROFILE_UPDATE}_LOADING`:
      return { ...state, loading: true }
    case `${PROFILE_FETCH}_SUCCESS`:
    case `${PROFILE_UPDATE}_SUCCESS`:
      return { ...state, ...action.payload, loading: false }
    case `${PROFILE_FETCH}_ERROR`:
    case `${PROFILE_UPDATE}_ERROR`:
      return { ...state, error: errMapper(action.payload), loading: false }
    case PROFILE_UPDATE_FIELD:
      return { ...state, [action.name]: action.value }
    default:
      return state;
  }
}
