import { Exception } from '@adonisjs/core/build/standalone'
import type { AuthContract } from '@ioc:Adonis/Addons/Auth'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import type { DateTime } from 'luxon'

type RegisterUserType = {
  email: string
  password: string
  firstName: string
  lastName: string
  dateOfBirth: DateTime
}

class AuthService {
  public async registerUser(payload: RegisterUserType, auth: AuthContract) {
    const existingUser = await User.findBy('email', payload.email)
    if (existingUser) {
      throw new Exception('User already exists')
    }

    const trx = await Database.transaction()

    try {
      const user = await User.create(
        { email: payload.email, password: payload.password },
        { client: trx }
      )
      await user.related('userProfile').create(
        {
          firstName: payload.firstName,
          lastName: payload.lastName,
          dateOfBirth: payload.dateOfBirth,
        },
        { client: trx }
      )
      await trx.commit()

      return auth.login(user)
    } catch (error) {
      await trx.rollback()
      throw new Exception('An error occured')
    }
  }
}

export default new AuthService()
