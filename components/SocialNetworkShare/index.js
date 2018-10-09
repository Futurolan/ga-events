import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import { FacebookIcon, TwitterIcon, FacebookShareButton, TwitterShareButton } from 'react-share'

class SocialNetworkShare extends React.Component {
  render () {
    const { router, title } = this.props
    return (
      <div className='v-social-network-links level' >
        <div className='level-item has-cursor-pointer'>
          <FacebookShareButton quote={title} url={`${process.env.BASE_URL}${router.asPath}`} ><FacebookIcon size={32} /></FacebookShareButton>
        </div>
        <div className='level-item has-cursor-pointer'>
          <TwitterShareButton via='GamersAssembly' title={title} url={`${process.env.BASE_URL}${router.asPath}`}><TwitterIcon size={32} /></TwitterShareButton>
        </div>
      </div>
    )
  }
}

SocialNetworkShare.propTypes = {
  router: PropTypes.object,
  title: PropTypes.string
}

export default withRouter(SocialNetworkShare)
