import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon'

export default class RegisterUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    minimumAllowedDate: DateTime.now().minus({ years: 18 }),
    maximumAllowedDate: DateTime.now().minus({ years: 120 }),
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
    dateOfBirth: schema.date({ format: 'yyyy-MM-dd' }, [
      rules.before(this.refs.minimumAllowedDate),
      rules.after(this.refs.maximumAllowedDate),
    ]),
  })

  public messages: CustomMessages = {
    'email.string': 'Enter a valid email',
    'email.email': 'Enter a valid email',

    'password.string': 'Enter a valid password',
    'password.minLength': 'Password should be minimum {{ options.minLength }} characters',
    'password.maxLength': 'Password should be maxLength {{ options.maxLength }} characters',
    'password.confirmPassword': 'Password and Confirm Password should be same',

    'firstName.string': 'Enter a valid first name',
    'firstName.alpha': 'First name should only contain alphabets',
    'firstName.minLength': 'First name should be minimum {{ options.minLength }} characters',
    'firstName.maxLength': 'First name should be maxLength {{ options.maxLength }} characters',

    'lastName.string': 'Enter a valid last name',
    'lastName.alpha': 'Last name should only contain alphabets',
    'lastName.minLength': 'Last name should be minimum {{ options.minLength }} characters',
    'lastName.maxLength': 'Last name should be maxLength {{ options.maxLength }} characters',

    'dateOfBirth.date': 'Enter a valid date of birth in {{ options.format }} format',
    'dateOfBirth.before': `Date of birth should be before ${this.refs.minimumAllowedDate.value.toFormat(
      'yyyy-MM-dd'
    )}`,
    'dateOfBirth.after': `Date of birth should be after ${this.refs.maximumAllowedDate.value.toFormat(
      'yyyy-MM-dd'
    )}`,
  }
}
