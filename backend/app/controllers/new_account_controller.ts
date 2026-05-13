import User from '#models/user'
import { signupValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import UserTransformer from '#transformers/user_transformer'
import Account from '#models/account'
import nodemailer from 'nodemailer'
import env from '#start/env'

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

    const numeroConta = Math.floor(
      100000 + Math.random() * 900000
    ).toString()

    const account = await Account.create({
      numeroConta,
      agencia: '0001',
      saldo: 0,
      userId: user.id,
    })

    const transporter = nodemailer.createTransport({
      host: env.get('MAIL_HOST'),
      port: Number(env.get('MAIL_PORT')),
      secure: false,
      auth: {
        user: env.get('MAIL_USER'),
        pass: env.get('MAIL_PASSWORD'),
      },
    })

    await transporter.sendMail({
      from: env.get('MAIL_FROM'),
      to: data.email,
      subject: 'Bem-vindo ao BANIF',
      text: `
Olá, ${data.fullName}!

Sua conta foi criada com sucesso no BANIF.

===== DADOS DE ACESSO =====

Login: ${data.email}
Senha: ${data.password}

===== DADOS BANCÁRIOS =====

Agência: 0001
Conta: ${numeroConta}
Saldo inicial: R$ 0,00

Acesse sua conta e altere sua senha após o primeiro login.

Atenciosamente,
Equipe BANIF
      `,
    })

    const token = await User.accessTokens.create(user)

    return serialize({
      user: UserTransformer.transform(user),
      account,
      token: token.value!.release(),
      mensagem:
        'Cliente cadastrado e e-mail enviado com sucesso',
    })
  }
}