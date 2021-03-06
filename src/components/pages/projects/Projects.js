import React, {Component} from 'react'
import Icon from 'react-toolbox/lib/font_icon/FontIcon'
import List from 'react-toolbox/lib/list/List'
import ListItem from 'react-toolbox/lib/list/ListItem'
import Tooltip from 'react-toolbox/lib/tooltip'
import Button from 'react-toolbox/lib/button/Button'
import ConfirmDeleteButton from 'components/shared/ConfirmDeleteButton'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { 
  fetchProjectsPage, deleteProject, getProjectsPage
} from 'reducers/projects.reducer'
import PaginationFooter from 'components/shared/PaginationFooter'

const TooltipIcon = Tooltip(Icon);
const TooltipButton = Tooltip(Button);

class Projects extends Component {
  pageSize = 5;
  componentDidMount() {
    this.fetchPage(0)
  }
  fetchPage(page) {
    this.props.fetchProjectsPage(page, this.pageSize, this.props.userIsAdmin)
  }
  renderListActions(project) {
    return [
      <Link
        to={`/projects/${project._id}/tasks`}
        key={`task_link_${project._id}`}
        style={{color: '#757575'}} >
        <TooltipIcon tooltipPosition="left" tooltip="Tareas" value="timer" />
      </Link>,
      <Link
        to={`/projects/${project._id}`}
        key={`edit_link_${project._id}`}
        style={{color: '#757575'}} >
        <TooltipIcon tooltipPosition="left" tooltip="Editar" value="edit" />
      </Link>,
      <ConfirmDeleteButton
        tooltip="Borrar"
        tooltipPosition="left"
        dialogTitle={`Borrar proyecto ${project.name}`}
        key={`delete_project_${project._id}`}
        onDelete={() => {
          this.props.deleteProject(project)
          .then(() => {
            this.fetchPage(this.props.pageParams.page)
          })
        }}
      />
    ]
  }
  render() {
    const {loading, projects, children, pageParams, responsive} = this.props;
    return (
      <div className="projects list-container">
        <div className="list-title-container">
          <h2 className="list-title">Proyectos</h2>
          {loading && <p className="color-primary">Cargando ... </p>}
        </div>
        <Link to="/projects/new">
          <TooltipButton
            icon="add"
            floating accent
            tooltip="Nuevo proyecto"
            tooltipPosition="left"
            className="list-corner-fab"
          />
        </Link>
        <List className="list">
          {projects.map((project, i) => (
            <ListItem
              key={i}
              leftIcon={responsive.mobile ? '':'work'}
              caption={project.name}
              className="list-item"
              rightActions={this.renderListActions(project)}
            />
          ))}
        </List>
        <PaginationFooter
          params={pageParams}
          onPageChange={page => this.fetchPage(page)}
        />
        {children}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {items, loading, params} = getProjectsPage(state)
  const userRoles = state.auth.roles || []
  const userIsAdmin = userRoles.indexOf("ADMIN") !== -1
  return {
    responsive: state.responsive,
    pageParams: params,
    projects: items,
    loading,
    userIsAdmin
  }
}
const actions = {fetchProjectsPage, deleteProject}

export default connect(mapStateToProps, actions)(Projects);
