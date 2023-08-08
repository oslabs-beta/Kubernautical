///<reference types = 'cypress'/>
import Chance from 'chance'
const chance = new Chance()

const fakeNumber = chance.integer({min:0,max:20}).toString()
describe('Main DashBoard Monitor', () => {
  
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
  it('Navigation to Network Performance works',()=>{
    cy.get('#NetworkButton').click()
    cy.url().should('include','network')
  })
  it('Changing time should work', ()=>{
    cy.get('#hourDropDown').select('1')
    cy.contains('1 hour').should("be.visible")
    cy.get('#hourDropDown').select('6')
    cy.contains('6 hour').should("be.visible")
    cy.get('#hourDropDown').select('12')
    cy.contains('12 hour').should("be.visible")
    cy.get('#hourDropDown').select('24')
    cy.contains('24 hour').should("be.visible")
  })
})
describe('Network Performance Monitor', () => {
  beforeEach(()=>{
    cy.visit('http://localhost:8000/network')
  })
  it('should contain the title Network Performance Monitor',()=>{
    cy.contains('Network Performance Monitor').should("be.visible")
  })
  it('Navigation to Main DashBoard works',()=>{
    cy.get('#MainDashButton').click()
    cy.url().should('include','dashboard')
  })
  it('Changing time should work', ()=>{
    cy.get('#hourDropDown').select('1')
    cy.contains('1 hour').should("be.visible")
    cy.get('#hourDropDown').select('6')
    cy.contains('6 hour').should("be.visible")
    cy.get('#hourDropDown').select('12')
    cy.contains('12 hour').should("be.visible")
    cy.get('#hourDropDown').select('24')
    cy.contains('24 hour').should("be.visible")
  })

})