import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import Countdown from 'react-countdown-now'

const countdownRenderer = ({ total, days, hours, minutes, seconds, milliseconds, completed }) => {
  return (
    <div>{days} jours {hours} heures {minutes} minutes {seconds} seconds</div>
  )
}

const Index = (props) => (
  <div className='ga-news-card card is-shadowless'>
    <div className='card-image'>
      <figure className='image is-2by1'>

        {props.imgDesktopUrl && props.imgWidescreenUrl && props.imgFullhdUrl && props.imgMobileUrl && <img
          srcSet={`${props.imgDesktopUrl} 288w, ${props.imgWidescreenUrl} 352w, ${props.imgFullhdUrl} 416w, ${props.imgMobileUrl} 720w`}
          sizes='(min-width: 1408px) 416px,(min-width: 1216px) 352px, (min-width: 769px) 288px,  100vw'
        />}
        {(props.imgDesktopUrl === undefined || props.imgWidescreenUrl === undefined && props.imgFullhdUrl === undefined && props.imgMobileUrl === undefined) && <p>No image //TODO</p>}
      </figure>
    </div>
    <div className='card-content '>
      <div className='content has-text-weight-semibold has-text-centered is-uppercase'>
        {props.title}

      </div>
      <p className='has-text-centered'>
        <Moment format='DD/MM/2018'>{props.date}</Moment> -
        <Moment format='DD/MM/2018'>{props.endDate}</Moment>

        <Countdown date={new Date(props.date).getTime()} renderer={countdownRenderer} className='countdown' />
      </p>
    </div>

  </div>
)

Index.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  endDate: PropTypes.string,
  imgFullhdUrl: PropTypes.string,
  imgWidescreenUrl: PropTypes.string,
  imgDesktopUrl: PropTypes.string,
  imgMobileUrl: PropTypes.string
}

export default Index
