import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

import dynamic from 'next/dynamic'

import './styles.scss'

const Countdown = dynamic(() => import('react-countdown-now'), {
  ssr: false
})

const CountdownRenderer = ({ total, days, hours }) => {
  return (
    <div>{days} jours {hours} heures</div>
  )
}

CountdownRenderer.propTypes = {
  total: PropTypes.number,
  days: PropTypes.number,
  hours: PropTypes.number
}

const Index = (props) => (
  <a target='_blank' href={props.url}>
    <div className='ga-edition-card card has-ribbon '>
      {props.ticketActive && <div className='ribbon  is-size-7'> Billetterie ouverte</div>}

      <div className='card-image'>
        <figure className='image is-2by1'>
          {props.imgDesktopUrl && props.imgWidescreenUrl && props.imgFullhdUrl && props.imgMobileUrl && <img
            src={props.imgMobileUrl}
            srcSet={`${props.imgDesktopUrl} 288w, ${props.imgWidescreenUrl} 352w, ${props.imgFullhdUrl} 416w, ${props.imgMobileUrl} 720w`}
            sizes='(min-width: 1408px) 416px,(min-width: 1216px) 352px, (min-width: 769px) 288px,  100vw'
          />}
        </figure>
      </div>
      <div className='card-content '>
        <div className='content has-text-weight-semibold has-text-centered is-uppercase'>
          {props.title}

        </div>
        <div className='has-text-centered'>
          <div>
            <Moment format='DD/MM/YYYY'>{props.date}</Moment> - <Moment format='DD/MM/YYYY'>{props.endDate}</Moment>
            <Countdown date={new Date(props.date).getTime()} renderer={CountdownRenderer} className='countdown' />
          </div>
        </div>
      </div>

    </div>
  </a>
)

Index.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  endDate: PropTypes.string,
  imgFullhdUrl: PropTypes.string,
  imgWidescreenUrl: PropTypes.string,
  imgDesktopUrl: PropTypes.string,
  imgMobileUrl: PropTypes.string,
  url: PropTypes.string,
  ticketActive: PropTypes.bool
}

export default Index
