import React from 'react'
import GoBack from './GoBack';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <h1 style={{
        opacity: 0.3,
        fontSize: '3em'
      }}>404</h1>
      <h3>
        Aqu&iacute; no hay nada
        <p style={{fontSize: '2em', marginTop: '.5rem'}}>
          ¯\_(ツ)_/¯
        </p>
      </h3>
      <GoBack />
    </div>
  )
}

export default NotFound
