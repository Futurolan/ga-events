import React from 'react'
import Link from 'next/link'

import SocialNetworksLinks from 'components/SocialNetworksLinks'

import './styles.scss'

import config from 'config/config'

class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = { isOpen: false }

    this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu () {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render () {
    return (
      <header className='ga-header'>
        <nav className='navbar has-background-dark'>
          <div className='navbar-brand'>
            <Link href='/'>
              <a>
                <img alt='Logo de la Gamers Assembly' src={config.logo} />
              </a>
            </Link>
            <Link href='/'>
              <a className='logo-futurolan'>
                <img alt='Logo FuturoLAN' src={config.logo2} />
              </a>
            </Link>
          </div>
          <div className='navbar-menu'>
            <div className='navbar-end'>
              {config.social && <div className='navbar-item'>
                <SocialNetworksLinks />
              </div>}
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

export default Header
