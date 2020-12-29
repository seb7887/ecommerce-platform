import './commands'
import * as faker from 'faker'

export const generateUser = () => ({
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
})

export const generateProduct = () => ({
  name: faker.commerce.productName(),
  author: faker.internet.userName(),
  description: faker.commerce.productDescription(),
  price: faker.commerce.price(),
  cost: faker.commerce.price(),
  stock: faker.random.number(),
})
