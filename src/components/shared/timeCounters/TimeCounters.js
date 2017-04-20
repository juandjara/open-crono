import React from 'react'
import Icon from 'react-toolbox/lib/font_icon/FontIcon'
import './TimeCounters.css';

const timeData = [
  {time: "00:00:00", icon: "timer", tooltip: "Tiempo actual"},
  {time: "00:00:00", icon: "today", tooltip: "Tiempo de hoy"},
  {time: "00:00:00", icon: "date_range", tooltip: "Tiempo de la semana"},
  {time: "00:00:00", icon: "event_note", tooltip: "Tiempo del mes"},
]

const Counter = ({time, tooltip, icon}) => (
  <div className="time-counters-item">
    <Icon value={icon} />
    <span data-tip={tooltip}>{time}</span>
  </div>
)

const TimeCounters = (props) => {
  return (
    <section {...props} className="time-counters">
      {timeData.map((timeItem, i) => (
        <Counter key={i} {...timeItem} />
      ))}
    </section>
  )
}

export default TimeCounters