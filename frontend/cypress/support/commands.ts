import '@testing-library/cypress/add-commands'
import { generateUser } from '.'

Cypress.Commands.add('signUp', () => {
  const user = generateUser()
  return cy
    .request({
      url: 'http://localhost:1337/auth/local/register',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: user,
    })
    .then(() => user)
})

Cypress.Commands.add('signIn', user => {
  return cy
    .request({
      url: 'http://localhost:1337/auth/local',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        identifier: user.email,
        password: user.password,
      },
    })
    .then(loggedUser => loggedUser.body)
})
