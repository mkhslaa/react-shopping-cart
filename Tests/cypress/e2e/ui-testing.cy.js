// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />
import 'cypress-map'
import * as Constants from '../support/constants/constants'
import * as Selectors from '../support/selectors/selectors'

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

it('TC01- Add all Free shipping items to the cart and verify', () => {
  cy.visit('/')
  cy.title().should('eq', 'Typescript React Shopping cart')

  cy.get(Selectors.PRODUCT_STOPPER).each(($list) => {
    cy.wrap($list).within(() => {
      cy.contains(Constants.FREE_SHIPPING)
        .parent()
        .contains(Constants.ADD_TO_CART)
        .click()
    })

    // close cart
    cy.get(Selectors.CART_BUTTON).click()
  })

  // open cart to check qnty
  cy.get(Selectors.CART_ICON).click()

  cy.get(Selectors.CART_QUANTITY).should(
    'contain',
    Constants.CART_QUANTITY_THIRTEEN,
  )
})

it('TC02- Increase a product quanity inside cart and verify', () => {
  cy.visit('/')
  cy.title().should('eq', Constants.TITLE)

  cy.get(Selectors.PRODUCT_STOPPER)
    .first()
    .within(() => {
      cy.contains(Constants.FREE_SHIPPING)
        .parent()
        .contains(Constants.ADD_TO_CART)
        .click()
    })
  cy.get(Selectors.CART_QUANTITY).should('contain', Constants.CART_QUANTITY_ONE)

  // click '+' once to increase quantity
  cy.get(Selectors.CART_PRODUCT_CHANGE_QUANTITY).each(($qnty) => {
    cy.get($qnty)
      .invoke('text')
      .then(($text) => {
        if ($text === Constants.PLUS) {
          cy.wrap($qnty).click({ force: true })
          cy.wait(100)
        }
      })
  })
  //Check quantity has increased to 2
  cy.get(Selectors.CART_QUANTITY).should('contain', Constants.CART_QUANTITY_TWO)
})

it('TC03- Verify cart total', () => {
  const items = ['Blue T-Shirt', 'Grey T-shirt']

  cy.visit('/')
  cy.title().should('eq', Constants.TITLE)

  items.forEach((itemName) => {
    cy.contains(itemName).parent().contains(Constants.ADD_TO_CART).click()
    cy.get(Selectors.CART_BUTTON).click()
  })

  // Verify items in cart is same as expected and each item quantity is 1
  cy.get(Selectors.CART_ICON).click()
  items.forEach((itemName, k) => {
    cy.get(Selectors.CART_PRODUCT_TITLE).eq(k).should('have.text', itemName)
    cy.get(Selectors.CART_PRODUCT_DESC)
      .eq(k)
      .should('contain', Constants.CART_QUANTITY_ONE)
  })

  // Sum the each item price and verify sum is same as total
  let sum = 0
  cy.get(Selectors.CART_PRODUCT_PRICE)
    .then(($list) => Cypress._.map($list, 'innerText'))
    .mapInvoke('slice', 1)
    .map(Number)
    .print('%0')
    .then((prices) => {
      sum = Cypress._.sum(prices)
      cy.log('sum is ', sum)

      cy.get(Selectors.CART_PRODUCT_SUB_PRICE)
        .invoke('text')
        .then(($text) => {
          let total = $text.slice(1)
          cy.log('total is ', total)
          expect(parseFloat(total)).equal(parseFloat(sum), ' total is not same')
        })
    })
})
