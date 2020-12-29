import { generateProduct } from '../support'

const product = generateProduct()

it('publish, edit and delete a product', () => {
  cy.signUp().then(user => {
    cy.signIn(user).then(user => {
      cy.setCookie('jwt', user.jwt)
      cy.visit('/products')
      // Create
      cy.findByTestId('action').click()
      cy.findByTestId('name').click().type(product.name)
      cy.findByTestId('author').click().type(product.author)
      cy.findByTestId('description').click().type(product.description)
      cy.findByTestId('price').click().type(product.price)
      cy.findByTestId('cost').click().type(product.cost)
      cy.findByTestId('stock').click().type(product.stock)
      cy.findByTestId('submit').click()
      cy.findByText('Published!').should('exist')

      cy.findByTestId('count').should('exist')
      cy.findByText(product.name).click()

      // Update
      cy.findByTestId('three-dot-button').click()
      cy.findByTestId('item-0').click()
      cy.findByTestId('name').click().type(`${product.name} Edited`)
      cy.findByTestId('submit').click()
      cy.findByText('Success!').should('exist')

      // Delete
      cy.findByTestId('three-dot-button').click()
      cy.findByTestId('item-1').click()
      cy.findByText('OK').click()
      cy.findByText('Success!').should('exist')
    })
  })
})
