import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

Footer.defaultProps = {
  copyright: '',
  githubUrl: '',
}

Footer.propTypes = {
  copyright: PropTypes.string,
  githubUrl: PropTypes.string,
}

export default function Footer({ copyright, githubUrl }) {
  return (
    <div className={'footer'}>
      <a
        href={githubUrl}
        target={'_blank'}
        rel={'noreferrer'}
      >
        {copyright}
      </a>
    </div>
  )
}
