import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import EditionCard from 'components/EditionCard'

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
    return <div className='ga-home-editions-list has-bg-star'>
      <section className='section'>
        <div className='container'>
          <h2 className='title title-line has-text-centered is-size-5 is-uppercase'><span>événements à venir</span></h2>

          <div className='is-multiline columns is-6 is-variable editions-list'>
            {nodeQuery.entities.map((edition) => (
              <div className='column is-4-desktop is-12' key={edition.nid}>
                <EditionCard title={edition.title}
                  date={edition.date.value}
                  endDate={edition.endDate.value}
                  imgMobileUrl={edition.image ? edition.image.mobile.url : null}
                  imgDesktopUrl={edition.image ? edition.image.desktop.url : null}
                  imgWidescreenUrl={edition.image ? edition.image.widescreen.url : null}
                  imgFullhdUrl={edition.image ? edition.image.fullhd.url : null} />
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  }
  return <div className='ga-home-editions-list'>
    <section className='section'>
      <div className='container'>
        <div className='notification'>Chargement des editions en cours</div>
      </div>
    </section>
  </div>
}

export const editions = gql`
{
  nodeQuery(filter: {conditions: {field: "type", value: "edition"}}) {
    entities {
      ... on NodeEdition {
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
