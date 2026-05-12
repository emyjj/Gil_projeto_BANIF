import vine from '@vinejs/vine'

/**
 * Shared rules for email and password.
 */
const email = () => vine.string().email().maxLength(254)
const password = () => vine.string().minLength(8).maxLength(32)

/**
 * Validator to use when performing self-signup
 */
export const signupValidator = vine.create({
  fullName: vine.string().minLength(3),

  email: email().unique({
    table: 'users',
    column: 'email',
  }),

  password: password(),

  passwordConfirmation: password().sameAs('password'),

  cpf: vine.string().minLength(11).maxLength(14),

  cidade: vine.string().minLength(2),

  estado: vine.string().minLength(2).maxLength(2),

  rua: vine.string().minLength(3),

  telefone: vine.string().minLength(8),
})

/**
 * Validator to use before validating user credentials
 * during login
 */
export const loginValidator = vine.create({
  email: email(),
  password: vine.string(),
})
