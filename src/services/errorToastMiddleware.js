import toast from './toastWrapper'

const errorToastMiddleware = store => next => action => {
  const {error, payload} = action
  if(error && payload) {
    toast('error', payload.message)
  }
  return next(action)
}

export default errorToastMiddleware