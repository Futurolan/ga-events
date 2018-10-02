import React from 'react'
import Layout from 'components/Layout'
import PageContent from 'components/PageContent'
import config from '../config/config'
import ErrorPage from 'next/error'

import '../styles/styles.scss'

class ContactsPage extends React.Component {
  render () {
    if (config.contact.active !== true) {
      return <ErrorPage statusCode={404} />
    }

    return (
      <Layout name='contacts-page has-bg-star'>
        <section className='section'>
          <div className='container'>
            <PageContent nid={config.contact.pageId.toString()} />
          </div>
        </section>
      </Layout>
    )
  }
}

export default ContactsPage
