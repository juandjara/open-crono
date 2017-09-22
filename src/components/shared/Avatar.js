import React from 'react'
import { connect } from 'react-redux'
import Avatar from 'react-toolbox/lib/avatar/Avatar'

const UserAvatar = ({profile, dispatch, ...props}) => {
  const title = profile.full_name
  return (
    <Avatar {...props} style={{margin: '0 .5em'}} title={title} />      
  )
}

const mapStateToProps = state => ({profile: state.profile})

export default connect(mapStateToProps)(UserAvatar)
