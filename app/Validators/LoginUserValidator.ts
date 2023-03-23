import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [rules.email()]),
    password: schema.string({ trim: true }, [rules.minLength(8), rules.maxLength(20)]),
  })

  public messages: CustomMessages = {
    'email.string': 'Enter a valid email',
    'email.email': 'Enter a valid email',

    'password.string': 'Enter a valid password',
    'password.minLength': 'Password should be minimum {{ options.minLength }} characters',
    'password.maxLength': 'Password should be maxLength {{ options.maxLength }} characters',
  }
}
