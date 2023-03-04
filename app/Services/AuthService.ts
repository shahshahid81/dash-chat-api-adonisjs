import { Exception } from '@adonisjs/core/build/standalone'
import type { AuthContract } from '@ioc:Adonis/Addons/Auth'
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

    const user = await User.create({ email: payload.email, password: payload.password })
    await user.related('userProfile').create({
      firstName: payload.firstName,
      lastName: payload.lastName,
      dateOfBirth: payload.dateOfBirth,
    })

    return auth.login(user)
  }
}

export default new AuthService()
