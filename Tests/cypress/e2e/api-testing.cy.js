// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

// use: https://petstore.swagger.io/#/user/loginUser
// use: https://speca.io/speca/petstore-api#addPet

const user = {
  ID: 1,
  USERNAME: 'mkhalsa',
  FIRSTNAME: 'manjeet',
  LASTNAME: 'khalsa',
  EMAIL: 'manjeet.khalsa@yahoo.com',
  PASSWORD: 'abc123',
  PHONE: '0123456789',
  USERSTATUS: 0,
}

const dog = {
  id: 1,
  category: {
    id: 1,
    name: 'French Bulldog',
  },
  name: 'max',
  photoUrls: [''],
  tags: [
    {
      id: 1,
      name: '',
    },
  ],
  status: 'available',
}

const order = {
  id: 99,
  petId: 1,
  quantity: 1,
  shipDate: '2023-05-18T15:55:28.131Z',
  status: 'placed',
  complete: true,
}

it('API Testing - create a user account', () => {
  cy.request({
    method: 'POST',
    url: `https://petstore.swagger.io/v2/user`,
    body: {
      id: user.ID,
      username: user.USERNAME,
      firstName: user.FIRSTNAME,
      email: user.EMAIL,
      password: user.PASSWORD,
      phone: user.PHONE,
      userStatus: user.USERSTATUS,
    },
    failOnStatusCode: false,
  }).then(($response) => {
    console.log('create user response  ', $response)
    expect($response.body.code).to.eq(200)
  })
})

it('API Testing - get user login info', () => {
  cy.request({
    method: 'GET',
    url: `https://petstore.swagger.io/v2/user/login?username=${user.USERNAME}&password=${user.PASSWORD}`,
    failOnStatusCode: false,
  }).then(($response) => {
    expect($response.body.code).to.eq(200)
  })
})

it('API Testing - Add a new dog to the store', () => {
  //Add a dog
  cy.request({
    method: 'POST',
    url: 'https://petstore.swagger.io/v2/pet',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: dog,
    failOnStatusCode: false,
  }).then(($response1) => {
    expect($response1.status).to.eq(200)
    cy.log('debug dog added', $response1)
  })
})

it('API Testing - Get a pet by ID', () => {
  cy.request({
    method: 'GET',
    url: 'https://petstore.swagger.io/v2/pet/1',
    headers: {
      Accept: 'application/json',
    },
    failOnStatusCode: false,
  }).then(($response1) => {
    cy.log($response1.body)
    expect($response1.status).to.eq(200)
    expect($response1.body.id).to.eq(dog.id)
    expect($response1.body.name).to.eq(dog.name)
  })
})

it('API Testing - Find a pet by sttaus', () => {
  cy.request({
    method: 'GET',
    url: 'https://petstore.swagger.io/v2/pet/findByStatus?status=available',
    headers: {
      Accept: 'application/json',
    },
    failOnStatusCode: false,
  }).then(($response1) => {
    cy.log($response1.body)
    expect($response1.status).to.eq(200)
    expect($response1.body).to.deep.include(dog)
  })
})

it('API Testing - Place an order for a pet', () => {
  cy.request({
    method: 'POST',
    url: 'https://petstore.swagger.io/v2/store/order',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: order,
    failOnStatusCode: false,
  }).then(($response1) => {
    cy.log($response1.body)
    expect($response1.status).to.eq(200)
    expect($response1.body.id).to.eq(order.id)
    expect($response1.body.petId).to.eq(order.petId)
    expect($response1.body.status).to.eq(order.status)
    expect($response1.body.complete).to.eq(order.complete)
  })
})

it('API Testing - Delete a pet by Id', () => {
  cy.request({
    method: 'DELETE',
    url: 'https://petstore.swagger.io/v2/pet/1',
    headers: {
      Accept: 'application/json',
      'api-key': 'special-key',
    },
    failOnStatusCode: false,
  }).then(($response1) => {
    cy.log($response1.body)
    expect($response1.status).to.eq(200)
    expect($response1.body.message).to.eq('1')
  })
})
