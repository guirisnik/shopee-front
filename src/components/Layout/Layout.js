import React from 'react'
import { node } from 'prop-types'

const propTypes = {
  children: node,
}

const Layout = ({ children }) => (
  <div style={{ padding: '20px' }}>{children}</div>
)

Layout.propTypes = propTypes

export { Layout }
