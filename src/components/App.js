import React, { Component } from 'react'
import Layout from 'react-toolbox/lib/layout/Layout';
import Panel from 'react-toolbox/lib/layout/Panel';
import ReactTooltip from 'react-tooltip';
import Sidenav from './Sidenav';
import Header from './Header';
import TaskQuickAccess from './TaskQuickAccess'
import { connect } from 'react-redux'
import { toggleSidenav } from '../ducks/sidenav'

class App extends Component {
  handleToggle = () => this.props.dispatch(toggleSidenav());
  render() {
    const { sidenavOpen, responsive, children } = this.props;
    const containerStyle = {
      //transition: 'all 0.4s ease',
      flex: 1
    }
    if (sidenavOpen && !responsive.small) {
      containerStyle.paddingLeft = 256
    }
    return (
      <Layout>
        <Sidenav />
        <Panel style={containerStyle}>
          <Header onToggleSidenav={this.handleToggle} />
          <TaskQuickAccess />
          <h2 style={{margin: "1rem"}}>Proyectos</h2>
          <main className="main">
            {children}
          </main>
          <ReactTooltip place="right" effect="solid" /> 
        </Panel>
      </Layout>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    sidenavOpen: state.sidenavOpen,
    responsive: state.responsive
  }
}

export default connect(mapStateToProps)(App)