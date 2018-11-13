import React from 'react'
import PropTypes from 'prop-types'
import * as gtag from 'lib/gtag'
import Router from 'next/router'

import Header from 'components/Header'
import Footer from 'components/Footer'

Router.events.on('routeChangeComplete', url => gtag.pageview(url))

const Layout = ({ name, children }) => (
  <div className={`site ${name}`}>
    <Header />
    <main className='site-content'>
      { children }
    </main>
    <Footer />
  </div>
)

Layout.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
}

export default Layout
