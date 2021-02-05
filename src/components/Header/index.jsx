import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

Header.defaultProps = {
  title: '',
  description: '',
}

Header.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
}

export default function Header({ title, description }) {
  return (
    <div className={'header'}>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  )
}
