import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import EditionCard from 'components/EditionCard'
import './styles.scss'
function EditionsList ({
  data: { loading, error, nodeQuery }
}) {
  if (error) {
    return <div className='ga-editions-list has-bg-star'>
      <section className='section'>
        <div className='container'>
          <div className='notification is-danger'>Une erreur est survenue pendant le chargement des editions !!!</div>
        </div>
      </section>
    </div>
  }

  if (nodeQuery && nodeQuery.entities && nodeQuery.entities.length) {
    return <div className='ga-editions-list has-bg-star'>
      <section className='section'>
        <div className='container'>

          <div className='is-multiline columns is-centered is-6 is-variable editions-list is-vcentered'>
            {nodeQuery.entities.map((edition) => (
              <div className='column is-4-desktop is-12' key={edition.nid}>
                <EditionCard title={edition.title}
                  date={edition.date.value}
                  endDate={edition.endDate.value}
                  imgMobileUrl={edition.image ? edition.image.mobile.url : null}
                  imgDesktopUrl={edition.image ? edition.image.desktop.url : null}
                  imgWidescreenUrl={edition.image ? edition.image.widescreen.url : null}
                  imgFullhdUrl={edition.image ? edition.image.fullhd.url : null}
                  url={edition.url} />
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  }
  return <div className='ga-editions-list'>
    <section className='section'>
      <div className='container'>
        <div className='notification'>Chargement des editions en cours</div>
      </div>
    </section>
  </div>
}

export const editions = gql`
{
  nodeQuery(
  filter: {conditions: [{field: "type", value: "edition"},{field:"field_edition_display_on_ga",value:"1"}]},
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