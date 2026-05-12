import User from '#models/user'
import { signupValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import UserTransformer from '#transformers/user_transformer'
import Account from '#models/account'

export default class NewAccountController {
async store({ request, serialize }: HttpContext) {
  const data = await request.validateUsing(signupValidator)

  const user = await User.create({
    fullName: data.fullName,
    email: data.email,
    password: data.password,
    cpf: data.cpf,
    cidade: data.cidade,
    estado: data.estado,
    rua: data.rua,
    telefone: data.telefone,
  })

  const numeroConta = Math.floor(100000 + Math.random() * 900000).toString()

  const account = await Account.create({
    numeroConta: numeroConta,
    agencia: '0001',
    saldo: 0,
    userId: user.id,
  })

  const token = await User.accessTokens.create(user)

  return serialize({
    user: UserTransformer.transform(user),
    account,
    token: token.value!.release(),
    mensagem: 'Cliente cadastrado e conta corrente criada com sucesso',
  })
}
}