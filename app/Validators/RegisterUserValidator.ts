import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon'

export default class RegisterUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    allowedDate: DateTime.now().minus({ years: 18 }),
  })

  public schema = schema.create({
    email: schema.string({ trim: true }, [rules.email()]),
    password: schema.string({ trim: true }, [
      rules.minLength(8),
      rules.maxLength(20),
      rules.confirmed('confirmPassword'),
    ]),
    firstName: schema.string({ trim: true }, [
      rules.alpha(),
      rules.minLength(3),
      rules.maxLength(20),
    ]),
    lastName: schema.string({ trim: true }, [
      rules.alpha(),
      rules.minLength(3),
      rules.maxLength(20),
    ]),
    dateOfBirth: schema.date({ format: 'yyyy-MM-dd' }, [rules.before(this.refs.allowedDate)]),
  })
}
