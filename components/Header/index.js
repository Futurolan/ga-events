import React from 'react'
import Link from 'next/link'

import './styles.scss'

import config from '../../config/config'
import SocialNetworksLinks from 'components/SocialNetworksLinks'

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
                <img src={config.logo} />
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
