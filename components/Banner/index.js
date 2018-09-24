import React from 'react'
import PropTypes from 'prop-types'

const Banner = (props) => (
  <section className='ga-banner'>
    <img src={props.imgUrl} />
  </section>
)

Banner.propTypes = {
  imgUrl: PropTypes.string
}

export default Banner
