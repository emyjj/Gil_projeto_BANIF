import Account from '#models/account'
import Investment from '#models/investment'
import Transaction from '#models/transaction'

import type { HttpContext } from '@adonisjs/core/http'

export default class InvestmentsController {
  async invest({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const account = await Account.findBy('userId', user.id)

    if (!account) {
      return response.badRequest({
        message: 'Conta não encontrada',
      })
    }

    const tipo = request.input('tipo')
    const valor = Number(request.input('valor'))

    if (Number(account.saldo) < valor) {
      return response.badRequest({
        message: 'Saldo insuficiente',
      })
    }

    account.saldo = Number(account.saldo) - valor

    await account.save()

    await Investment.create({
      tipo,
      valor,
      accountId: account.id,
    })

    await Transaction.create({
      tipo: 'aplicacao',
      valor,
      descricao: `Aplicação em ${tipo}`,
      accountId: account.id,
      contaDestinoId: account.id,
    })

    return {
      message: 'Aplicação realizada com sucesso',
    }
  }

  async list({ auth }: HttpContext) {
    const user = auth.getUserOrFail()

    const account = await Account.findBy('userId', user.id)

    if (!account) {
      return []
    }

    return Investment.query()
      .where('accountId', account.id)
      .orderBy('createdAt', 'desc')
  }

  async rescue({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const account = await Account.findBy('userId', user.id)

    if (!account) {
      return response.badRequest({
        message: 'Conta não encontrada',
      })
    }

    const investment = await Investment.find(params.id)

    if (!investment) {
      return response.badRequest({
        message: 'Aplicação não encontrada',
      })
    }

    if (investment.accountId !== account.id) {
      return response.forbidden({
        message: 'Essa aplicação não pertence a você',
      })
    }

    account.saldo = Number(account.saldo) + Number(investment.valor)

    await account.save()

    await Transaction.create({
      tipo: 'resgate',
      valor: Number(investment.valor),
      descricao: `Resgate de aplicação em ${investment.tipo}`,
      accountId: account.id,
      contaDestinoId: account.id,
    })

    await investment.delete()

    return {
      message: 'Aplicação resgatada com sucesso',
    }
  }
}