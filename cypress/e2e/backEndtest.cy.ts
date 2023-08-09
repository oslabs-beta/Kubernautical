///<reference types = 'cypress'/>

describe('Prom Router', () =>{
  it('Get request for memory',() =>{
    cy.request('http://localhost:3000/api/prom/?type=mem&hour=24')
  })
})