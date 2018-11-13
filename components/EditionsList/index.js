import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

import EditionCard from 'components/EditionCard'

import './styles.scss'

function EditionsList ({
  data: { loading, error, nodeQuery }
}) {
  if (error) {
    return <div className='ga-editions-list has-bg-star'>
      <section className='section has-bg-star'>
        <div className='container'>
          <div className='notification is-danger'>Une erreur est survenue pendant le chargement des éditions !!!</div>
        </div>
      </section>
    </div>
  }

  if (nodeQuery && nodeQuery.entities && nodeQuery.entities.length > 0) {
    const currentEditions = []
    const pastEditions = []

    for (let index in nodeQuery.entities) {
      const edition = nodeQuery.entities[index]
      if (new Date(edition.endDate.value) > new Date()) {
        currentEditions.push(edition)
      } else {
        pastEditions.push(edition)
      }
    }

    return <div className='ga-editions-list has-bg-star'>
      {currentEditions.length > 0 && <section className='section has-bg-star'>
        <div className='container'>
          <h2 className='title title-line has-text-centered'>
            <span>{currentEditions.length === 1 ? 'Événement' : 'Événements'}</span></h2>
          <div className='is-multiline columns is-centered is-6 is-variable editions-list is-vcentered'>
            {currentEditions.map((edition) => {
              return <div className='column is-4-desktop is-12' key={edition.nid}>
                <EditionCard title={edition.title}
                  date={edition.date.value}
                  endDate={edition.endDate.value}
                  imgMobileUrl={edition.image ? edition.image.mobile.url : null}
                  imgDesktopUrl={edition.image ? edition.image.desktop.url : null}
                  imgWidescreenUrl={edition.image ? edition.image.widescreen.url : null}
                  imgFullhdUrl={edition.image ? edition.image.fullhd.url : null}
                  url={edition.url}
                  ticketActive={edition.weezeventUrl !== null} />
              </div>
            })}
          </div>
        </div>
      </section>}
      {pastEditions.length && <section className='section'>
        <div className='container'>
          <h3 className='title is-size-4 title-line has-text-centered'><span>{pastEditions.length === 1 ? 'Événement passé' : 'Événements passés'} </span></h3>
          <div className='is-multiline columns is-centered is-6 is-variable editions-list is-vcentered'>
            {pastEditions.reverse().map((edition) => {
              return <div className='column is-4-desktop is-12' key={edition.nid}>
                <a target='_blank' href={edition.url}>

                  <div className='card'>
                    <div className='card-content '>
                      <div className=' has-text-weight-semibold has-text-centered is-uppercase'>
                        {edition.title}
                      </div>
                      <div className='has-text-centered'>
                        <div>
                          <Moment format='DD/MM/YYYY'>{edition.date.value}</Moment> - <Moment
                            format='DD/MM/YYYY'>{edition.endDate.value}</Moment>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            })}
          </div>
        </div>
      </section>}
    </div>
  } else if (nodeQuery && nodeQuery.entities && nodeQuery.entities.length === 0) {
    return null
  } else {
    return <div className='ga-editions-list'>
      <section className='section has-bg-star'>
        <div className='container'>
          <div className='notification'>Chargement des éditions en cours</div>
        </div>
      </section>
    </div>
  }
}

export const editions = gql`
{
  nodeQuery(
  filter: {conditions: [{field: "status", value: "1"},{field: "type", value: "edition"},{field:"field_edition_display_on_ga",value:"1"}]},
  sort:{field:"field_edition_start_date",direction:ASC}) {
    entities {
      ... on NodeEdition {
        nid
        title
        date:fieldEditionStartDate{
          value
        }
        endDate:fieldEditionEndDate{
          value
        }
        weezeventUrl:fieldEditionWeezeventUrl
        url:fieldEditionUrl
        place:fieldEditionPlace
        image:fieldEditionImage{
          mobile:derivative(style:CROP_2_1_720X360){
            url
          }
          desktop:derivative(style:CROP_2_1_288X144){
            url
          }
          widescreen:derivative(style:CROP_2_1_352X176){
            url
          }
          fullhd:derivative(style:CROP_2_1_416X208){
            url
          }
        }
      }
    }
  }
}
`
EditionsList.propTypes = {
  data: PropTypes.object
}

export default graphql(editions)(EditionsList)
