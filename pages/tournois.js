import React from 'react'
import Layout from 'components/Layout'
import Meta from 'components/Meta'
import TournamentList from 'components/TournamentList'
import '../styles/styles.scss'
import config from '../config/config'
import ErrorPage from 'next/error'

class TournoisPage extends React.Component {
  render () {
    if (config.tournaments.active !== true) {
      return <ErrorPage statusCode={404} />
    }

    return (
      <Layout name='tournois-page has-bg-star'>
        <div className='section'>
          <Meta title={config.tournaments.title} description={config.tournaments.description} />
          <div className='container'>
            <h1 className='title title-line has-text-centered'><span>Tournois</span></h1>
            <TournamentList />
          </div>
        </div>
      </Layout>
    )
  }
}

export default TournoisPage
