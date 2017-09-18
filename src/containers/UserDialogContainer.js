import React, {Component} from 'react'
import UserDialog from '../components/UserDialog'
import { connect } from 'react-redux'
import {
  fetchUserIfNeeded,
  editUser,
  getUserById
} from '../reducers/users.reducer'
import { setProperty, touchProperty, initForm, resetForm, setTouched } from '../reducers/form.reducer'
import { fetchClientsPage, getClientsSelect } from '../reducers/clients.reducer'
import validate, {isRequired, passwordMatch} from '../components/Validate'
import { compose } from 'redux'

class UserDialogContainer extends Component {
  onSubmit = (user) => {
    const {isValid, editUser, loading} = this.props
    if(loading || !isValid) {
      this.touchAll()
      return
    }
    user.authorities = user.authorities.split(',').map(a => a.trim())
    editUser(user, this.isEditMode())
  }
  touchAll() {
    const touched = 'login,email,password,repeat_password'.split(',')
    this.props.setTouched(touched)
  }
  isEditMode() {
    return !isNaN(this.props.routeParams._id)
  }
  render() {
    return (
      <UserDialog
        id={this.props.routeParams._id}
        isEditMode={this.isEditMode()} 
        onChange={this.props.setProperty}
        onBlur={this.props.touchProperty} 
        onSubmit={this.onSubmit}
        {...this.props} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const user = getUserById(state, ownProps.routeParams._id)
  const companies = getClientsSelect(state)
  const {model, touched} = state.ui.form
  return {
    loading: user.loading,
    user,
    model,
    touched,
    companies
  }
}
const actions = {
  fetchUserIfNeeded, editUser, fetchClientsPage,
  setProperty, touchProperty, resetForm, initForm, setTouched
}

export default compose(
  connect(mapStateToProps, actions),
  validate([
    isRequired('login'),
    isRequired('email'),
    isRequired('password'),
    isRequired('repeat_password'),
    passwordMatch('password', 'repeat_password'),
    passwordMatch('repeat_password', 'password')
  ])
)(UserDialogContainer);
