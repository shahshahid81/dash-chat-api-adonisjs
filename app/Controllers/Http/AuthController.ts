import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthService from 'App/Services/AuthService'
import LoginUserValidator from 'App/Validators/LoginUserValidator'
import RegisterUserValidator from 'App/Validators/RegisterUserValidator'

export default class AuthController {
  public async register({ request, auth }: HttpContextContract) {
    const payload = await request.validate(RegisterUserValidator)
    return AuthService.registerUser(payload, auth)
  }

  public async login({ request, auth }: HttpContextContract) {
    const payload = await request.validate(LoginUserValidator)
    return auth.attempt(payload.email, payload.password)
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.logout()
    return { success: true }
  }
}
