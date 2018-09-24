import React from 'react'

import Layout from 'components/Layout'
import Banner from 'components/Banner'
import HomeNewsList from 'components/HomeNewsList'
import HomeInfoBlocks from 'components/HomeInfo/index'
import Meta from 'components/Meta'
import config from '../config/config'
import '../styles/styles.scss'

class HomePage extends React.Component {
  render () {
    return (
      <Layout name='home-page'>
        <div>
          <Meta title='Accueil' />
          <Banner imgUrl={config.home.banner} />
          <HomeInfoBlocks />
          <HomeNewsList />
        </div>
      </Layout>
    )
  }
}

export default HomePage
