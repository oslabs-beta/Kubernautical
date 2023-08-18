import React from 'react'
import InvisibleNavbar from '../../client/containers/InvisibleNavbar/InvisibleNavbar'

describe('<InvisibleNavbar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<InvisibleNavbar />)
  })
})