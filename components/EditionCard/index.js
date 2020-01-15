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

const EditionCard = (props) => (
  <a target='_blank' href={props.url} rel='noopener noreferrer'>
    <div className={`ga-edition-card card has-ribbon ${new Date(props.date) < new Date() && new Date(props.endDate) > new Date() ? 'is-live' : ''}`}>
      {new Date(props.date) < new Date() && new Date(props.endDate) > new Date() && <div className='ribbon has-text-white is-size-5 has-background-danger'>En cours</div>}
      {new Date(props.date) > new Date() && props.ticketActive && <div className='ribbon  is-size-7'> Billetterie ouverte</div>}

      <div className='card-image'>
        <figure className='image is-2by1'>
          {props.imgDesktopUrl && props.imgWidescreenUrl && props.imgFullhdUrl && props.imgMobileUrl &&
            <img
              src={props.imgMobileUrl}
              srcSet={`${props.imgDesktopUrl} 288w, ${props.imgWidescreenUrl} 352w, ${props.imgFullhdUrl} 416w, ${props.imgMobileUrl} 720w`}
              sizes='(min-width: 1408px) 416px,(min-width: 1216px) 352px, (min-width: 769px) 288px,  100vw'
              alt={`Image de présentation de ${props.title}`}
            />}
        </figure>
      </div>
      <div className='card-content '>
        <div className='content'>
          <h3 className='is-size-6 has-text-weight-semibold has-text-centered is-uppercase'>{props.title}</h3>
        </div>
        <div className='has-text-centered'>
          <div>
            <Moment format='DD/MM/YYYY'>{props.date}</Moment> - <Moment format='DD/MM/YYYY'>{props.endDate}</Moment>
            {new Date(props.date) > new Date() && <Countdown date={new Date(props.date).getTime()} renderer={CountdownRenderer} className='countdown' />}
            {new Date(props.date) < new Date() && new Date(props.endDate) > new Date() && <div>&nbsp;</div>}
          </div>
        </div>
      </div>
    </div>
  </a>
)

EditionCard.propTypes = {
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

export default EditionCard
