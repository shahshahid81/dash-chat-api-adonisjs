import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthService from 'App/Services/AuthService'
import RegisterUserValidator from 'App/Validators/RegisterUserValidator'

export default class AuthController {
  public async register({ request, auth }: HttpContextContract) {
    const payload = await request.validate(RegisterUserValidator)
    return AuthService.registerUser(payload,auth)
  }
}
