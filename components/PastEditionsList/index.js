import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import EditionCard from 'components/EditionCard'
import './styles.scss'
import Moment from 'react-moment'
function PastEditionsList ({
  data: { loading, error, nodeQuery }
}) {
  if (error) {
    return <div className='ga-past-editions-list has-bg-star'>
      <section className='section'>
        <div className='container'>
          <div className='notification is-danger'>Une erreur est survenue pendant le chargement des éditions !!!</div>
        </div>
      </section>
    </div>
  }
  if (loading) {
    return <div className='ga-past-editions-list'>
      <section className='section'>
        <div className='container'>
          <div className='notification'>Chargement des éditions en cours</div>
        </div>
      </section>
    </div>
  }

  if (nodeQuery && nodeQuery.entities && nodeQuery.entities.length > 0) {
    return <div className='ga-past-editions-list has-bg-star'>
      <section className='section'>
        <div className='container'>
          <h3 className='title is-size-4 title-line has-text-centered'><span>{nodeQuery.entities.length === 1 ? 'Événement passé' : 'Événements passés'} </span></h3>

          <div className='is-multiline columns is-centered is-6 is-variable editions-list is-vcentered'>
            {nodeQuery.entities.map((edition) => (
              <div className='column is-4-desktop is-12' key={edition.nid}>
                <a target='_blank' href={edition.url}>

                  <div className='card'>
                    <div className='card-content '>
                      <div className=' has-text-weight-semibold has-text-centered is-uppercase'>
                        {edition.title}
                      </div>
                      <div className='has-text-centered'>
                        <div>
                          <Moment format='DD/MM/YYYY'>{edition.date.value}</Moment> - <Moment format='DD/MM/YYYY'>{edition.endDate.value}</Moment>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  }
  return null
}

export const editions = gql`
{
  nodeQuery(
  filter: {conditions: [{field: "status", value: "1"},{field: "type", value: "edition"},{field:"field_edition_display_on_ga",value:"1"},{field: "field_edition_end_date", operator: SMALLER_THAN, value: "${new Date().toISOString()}"}]},
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
PastEditionsList.propTypes = {
  data: PropTypes.object
}

export default graphql(editions)(PastEditionsList)
