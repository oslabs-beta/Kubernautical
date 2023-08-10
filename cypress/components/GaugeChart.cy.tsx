import React from 'react'
import GaugeChart from '../../client/components/Graphs/GaugeChart'

describe('<GaugeChart />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<GaugeChart />)
  })
})