import React, {Component} from 'react'
import Icon from 'react-toolbox/lib/font_icon/FontIcon'
import List from 'react-toolbox/lib/list/List'
import ListItem from 'react-toolbox/lib/list/ListItem'
import Tooltip from 'react-toolbox/lib/tooltip'
import { Link } from 'react-router'
import TaskQuickAccess from '../components/taskQuickAccess/TaskQuickAccess'
import ShowOnMedia from '../components/ShowOnMedia'
import { connect } from 'react-redux'
import { fetchProjects } from '../reducers/projects.reducer'

const TooltipIcon = Tooltip(Icon);

class Projects extends Component {
  componentDidMount() {
    this.props.dispatch(fetchProjects());
  }
  parsePercent(percent) {
    percent = parseFloat(percent) || 0;
    const num = (percent * 100).toFixed(2)
    return `${num} %`;
  }
  renderListActions(project) {
    const actionsData = [
      {link: `/requests/${project.id}`, icon: 'record_voice_over', tooltip: 'Solicitudes'},
      {link: `/tasks/${project.id}`, icon: 'timer', tooltip: 'Tareas'},
      {link: `/projects/${project.id}`, icon: 'edit', tooltip: 'Editar'}
    ]
    return actionsData.map((data, i) => (
      <Link
        to={data.link}
        key={`${project.id}_action_${i}`}
        style={{color: '#757575'}} >
        <TooltipIcon
          tooltip={data.tooltip}
          value={data.icon} />
      </Link>
    ))
  }
  render() {
    const {projects, loading} = this.props;
    return (
      <div className="projects"
           style={{padding: ".5em"}}>
        <h2 style={{margin: "1rem"}}>Proyectos</h2>
        {/* <ShowOnMedia mediaKey="small">
          <section style={{flex: 1, marginRight: '2px', marginBottom: '.5rem'}}>
            <p style={{display: 'flex', margin: '.75rem 0'}} >
              <Icon className="task-cards-star">star</Icon>
              Tareas destacadas
            </p>
            <TaskQuickAccess />
          </section>
        </ShowOnMedia> */}
        {loading && <p className="color-teal">Cargando ... </p>}
        <List className="list">
          {projects.map((project, i) => (
            <ListItem
              key={i}
              caption={project.name}
              leftIcon="work"
              className="list-item"
              rightActions={this.renderListActions(project)}
            />
          ))}
        </List>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  projects: state.projects.data,
  loading: state.projects.loading
});

export default connect(mapStateToProps)(Projects);
