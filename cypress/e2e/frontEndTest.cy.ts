///<reference types = 'cypress'/>
import Chance from 'chance'
const chance = new Chance()
import {mount} from 'cypress/react'
import LineGraph from '../../client/components/Graphs/LineGraph'
import GaugeChart from '../../client/components/Graphs/GaugeChart'
import InvisibleNavbar from '../../client/containers/InvisibleNavbar'


const fakeNumber = chance.integer({min:0,max:20}).toString()
const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/

//REACT COMPONENTS TESTING
// describe('<LineGraph>',()=>{
//     it('mounts',()=>{
    
//     })

// })
// describe('<InvisibleNavbar>',()=>{
//   it('mounts',()=>{
  
//   })

// })
// describe('<GaugeChart>',()=>{
//   it('mounts',()=>{
  
//   })

// })
// describe('ClusterView Test', () => {
//   beforeEach(()=>{
//     Cypress.on('uncaught:exception', (err) => {
//       if (resizeObserverLoopErrRe.test(err.message)) {
//           return false
//       }
//   })
//     cy.visit('http://localhost:8000/')
//   })
//   it('Selecting Namespaces should work')
// })
describe('Main DashBoard Monitor test', () => {
  beforeEach(()=>{
    cy.visit('http://localhost:8000/dashboard')
  })
  it('contain the title Cluster Health Monitor', () => {
    cy.contains('Cluster Health Monitor').should("be.visible")
  })
  it('Load Testing Button works', ()=>{
    cy.get('.invisNavButton').click()
    // cy.contains('DDOS me')
    cy.get('input[placeholder="Number of VUs"]').type(fakeNumber)
    cy.get('input[placeholder="Test Duration"]').type('s')
    cy.contains('DDOS me').click()
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Please fill out both fields');
    });
  })
})

describe('Network Performance Monitor test', () => {
  beforeEach(()=>{
    cy.visit('http://localhost:8000/network')
  })
  it('should contain the title Network Performance Monitor',()=>{
    cy.contains('Network Performance Monitor').should("be.visible")
  })
})

describe('NavBar test', () => {
  beforeEach(()=>{
    Cypress.on('uncaught:exception', (err) => {
      if (resizeObserverLoopErrRe.test(err.message)) {
          return false
      }
  })
    cy.visit('http://localhost:8000/')
  })
  it('Navigation to Main DashBoard works',()=>{
    cy.get('#MainDashButton').click({force:true})
    cy.url().should('include','dashboard')
  })
  it('Navigation to Network Performance works',()=>{
    cy.get('#NetworkButton').click({force:true})
    cy.url().should('include','network')
  })
  it('Edit Cluster should work',()=>{
    cy.get('#EditClusterButton').click({force:true})
    cy.contains('Select Namespace')
  })
})

describe('LineGraph Test',()=>{
  beforeEach(()=>{
    cy.visit('http://localhost:8000/dashboard')
  })
    it('Hour Drop Down Menu exists', ()=>{
      cy.get('#hourDropDown').select('1')
      cy.contains('1 hour').should('have.value', '1')
      cy.get('#hourDropDown').select('6')
      cy.contains('6 hour').should('have.value', '6')
      cy.get('#hourDropDown').select('12')
      cy.contains('12 hour').should('have.value', '12')
      cy.get('#hourDropDown').select('24')
      cy.contains('24 hour').should('have.value', '24')
    })
    // it('Changing Name Spaces Menu exists')
})

// describe('Edit Cluster View Modal works',()=>{
//   it('Adding Namespace should work')
//   it('Deleting Namespace should work')
// })