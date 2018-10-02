import React from 'react'

import ActiveLink from '../ActiveLink'

import './styles.scss'
import config from '../../config/config'

class Footer extends React.Component {
  render () {
    return (
      <footer className='footer ga-footer has-background-dark has-text-white'>
        <div className='container'>
          <div className='content has-text-centered'>
            {config.contact.active && <ActiveLink className='has-text-white' label='Contacts' path='/contacts' />}
            {config.press.active && <ActiveLink className='has-text-white' label='Accreditation Presse' path='/espace-presse' />}
            {config.legals.active && <ActiveLink className='has-text-white' label='Mentions Légales ' path='/mentions-legales' />}
            {config.recruit.active && <ActiveLink className='has-text-white' label='Recrutement' path='/recrutement' />}
          </div>

        </div>
      </footer>
    )
  }
}

export default Footer
