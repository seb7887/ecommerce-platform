import './commands'
import * as faker from 'faker'

export const generateUser = () => ({
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
})
