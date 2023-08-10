///<reference types = 'cypress'/>
import Chance from 'chance'
const chance = new Chance()
const fakeNumber = chance.integer({min:0,max:20}).toString()
const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/


describe('ClusterView Test', () => {
  beforeEach(()=>{
    Cypress.on('uncaught:exception', (err) => {
      if (resizeObserverLoopErrRe.test(err.message)) {
          return false
      }
  })
    cy.visit('http://localhost:8000/')
  })
  it('Selecting Namespaces should work')
})
describe('Main DashBoard Monitor test', () => {
  beforeEach(()=>{
    cy.visit('http://localhost:8000/dashboard')
  })
  it('contain the title Cluster Health Monitor', () => {
    cy.contains('Cluster Health Monitor').should("be.visible")
  })
  it('Load Testing Button works', ()=>{
    cy.get('.invisNavButton').click()
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
  const cpuRoute='/api/prom/metrics?type=cpu&hour=24'
  const NetworkTransmittedRoute='/api/prom/metrics?type=trans&hour=24'
  const memoryRoute='/api/prom/metrics?type=mem&hour=24'
  const NetworkRecievedRoute='/api/prom/metrics?type=rec&hour=24'
  beforeEach(()=>{
    cy.visit('http://localhost:8000/dashboard')
  })
    const testApiData = (apiRoute: string, expectedData:any) => {
    cy.intercept('GET', apiRoute, {
      statusCode: 200,
      body: expectedData,
    }).as('LineGraphData');
    cy.wait('@LineGraphData').then((data:any) => {
      expect(data.response.statusCode).to.eq(200);
    })
  }
  const time = 1691535753.776
  it('Loads Cpu Line Graph Data', () => {
    const expectedCpuData: any = [{
      metric:{},
      values:[[time,'1'],[time,'2'],[time,'3'],
      [time,'4'],[time,'5'],[time,'6']]
      }];
    testApiData(cpuRoute, expectedCpuData);
  })
  it('Loads memory Line Graph Data', () => {
    const expectedMemoryData: any = [{
      metric:{},
      values:[[time,'19224410448'],[time,'1902455540448'],[time,'1902440448'],
      [time,'190243410448'],[time,'1902424440448'],[time,'1904440448']]
      }];
    testApiData(memoryRoute, expectedMemoryData);
  })
  it('Loads memory Line Graph Data', () => {
    cy.visit('http://localhost:8000/network')
    const expectedNetworkTransmittedRoute: any = [{
      metric:{},
      values:[[time,'19248'],[time,'19020448'],[time,'19048'],
      [time,'190248'],[time,'40448'],[time,'90448']]
      }];
    testApiData(NetworkTransmittedRoute, expectedNetworkTransmittedRoute);
  })
  it('Loads memory Line Graph Data', () => {
    cy.visit('http://localhost:8000/network')
    const expectedNetworkRecievedRoute: any = [{
      metric:{},
      values:[[time,'19448'],[time,'1902448'],[time,'20448'],
      [time,'12448'],[time,'19048'],[time,'144448']]
      }];
    testApiData(NetworkRecievedRoute, expectedNetworkRecievedRoute);
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
    it('Changing Name Spaces Menu exists')
})

describe('Edit Cluster View Modal works',()=>{
  it('Adding Namespace should work')
  it('Deleting Namespace should work')
})

describe('Guage Graph Test', () => {
  const memoryApiRoute = '/api/prom/mem?type=mem&hour=24&notTime=true';
  const cpuApiRoute = '/api/prom/cpu?type=cpu&hour=24&notTime=true';
  type GuageApiData = Record<string, number>; // define type as an object where string is key and number is key value
  
  beforeEach(() => {
    cy.visit(`http://localhost:8000/dashboard`);
  });

  const testApiData = (apiRoute: string, expectedData: GuageApiData[]) => {
    cy.intercept('GET', apiRoute, {
      statusCode: 200,
      body: expectedData,
    }).as('fetchMock');

    cy.wait('@fetchMock').then((data:any) => {
      expect(data.response.statusCode).to.eq(200);
      const responseBody = data.response.body;
      expect(responseBody.length).to.eq(3);
      expect(responseBody[0]).to.deep.equal(expectedData[0]);
      expect(responseBody[1]).to.deep.equal(expectedData[1]);
      expect(responseBody[2]).to.deep.equal(expectedData[2]);
    });
  };

  it('Loads Memory Gauge Data', () => {
    const expectedMemoryData: GuageApiData[] = [
      { Memoryused: 10 },
      { Memoryrequested: 40 },
      { Memoryallocatable: 50 },
    ];

    testApiData(memoryApiRoute, expectedMemoryData);
  });

  it('Loads CPU Gauge Data', () => {
    const expectedCpuData: GuageApiData[] = [
      { Cpuused: 10 },
      { Cpurequested: 40 },
      { Cpuallocatable: 50 },
    ];
    testApiData(cpuApiRoute, expectedCpuData);
  });
});

