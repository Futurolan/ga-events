import React from 'react'

import Layout from 'components/Layout'
import Meta from 'components/Meta'
import EditionsList from 'components/EditionsList'

import '../styles/styles.scss'

class HomePage extends React.Component {
  render () {
    return (
      <Layout name='home-page has-bg-star'>
        <div>
          <Meta title='Accueil' />
          <EditionsList />
        </div>
      </Layout>
    )
  }
}

export default HomePage
