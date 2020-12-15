import { generateProduct } from '../support'

const product = generateProduct()

it('publish a new product', () => {
  cy.signUp().then(user => {
    cy.signIn(user).then(user => {
      cy.setCookie('jwt', user.jwt)
      cy.visit('/products')
      cy.findByTestId('action').click()
      cy.findByTestId('name').click().type(product.name)
      cy.findByTestId('author').click().type(product.author)
      cy.findByTestId('description').click().type(product.description)
      cy.findByTestId('price').click().type(product.price)
      cy.findByTestId('cost').click().type(product.cost)
      cy.findByTestId('stock').click().type(product.stock)
      cy.findByTestId('submit').click()
      cy.findByText('Published!').should('exist')
    })
  })
})
