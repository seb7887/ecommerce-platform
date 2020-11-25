import { generateUser } from '../support'

const user = generateUser()

it('signs up a new user', () => {
  cy.visit('/')
  cy.findByTestId('link').click()
  cy.findByTestId('username').click().type(user.username)
  cy.findByTestId('email').click().type(user.email)
  cy.findByTestId('password').click().type(user.password)
  cy.findByTestId('submit').click()
  cy.findByTestId('error').should('not.exist')
})

it('signs in an existing user', () => {
  cy.visit('/')
  cy.findByTestId('email').click().type(user.email)
  cy.findByTestId('password').click().type(user.password)
  cy.findByTestId('submit').click()
  cy.findByTestId('error').should('not.exist')
})
