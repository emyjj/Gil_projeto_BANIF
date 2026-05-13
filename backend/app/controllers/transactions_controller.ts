import Account from '#models/account'
import type { HttpContext } from '@adonisjs/core/http'
import Transaction from '#models/transaction'

export default class TransactionsController {
  async deposit({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const account = await Account.findBy('userId', user.id)

    if (!account) {
      return response.badRequest({
        message: 'Conta não encontrada',
      })
    }

    const valor = request.input('valor')

    account.saldo = Number(account.saldo) + Number(valor)

    await account.save()

    return {
      message: 'Depósito realizado com sucesso',
      saldo: account.saldo,
    }
    
  }
  async transfer({ auth, request, response }: HttpContext) {
  const user = auth.getUserOrFail()

  const contaOrigem = await Account.findBy('userId', user.id)

  if (!contaOrigem) {
    return response.badRequest({
      message: 'Conta origem não encontrada',
    })
  }

  const numeroContaDestino = request.input('numeroConta')

  const valor = Number(request.input('valor'))

  const contaDestino = await Account.findBy(
    'numeroConta',
    numeroContaDestino
  )

  if (!contaDestino) {
    return response.badRequest({
      message: 'Conta destino não encontrada',
    })
  }

  if (contaOrigem.id === contaDestino.id) {
    return response.badRequest({
      message: 'Você não pode transferir para sua própria conta',
    })
  }

  if (Number(contaOrigem.saldo) < valor) {
    return response.badRequest({
      message: 'Saldo insuficiente',
    })
  }

  contaOrigem.saldo =
    Number(contaOrigem.saldo) - valor

  contaDestino.saldo =
    Number(contaDestino.saldo) + valor

  await contaOrigem.save()

  await contaDestino.save()

  await Transaction.create({
    tipo: 'pix_enviado',
    valor,
    descricao: `Pix enviado para conta ${contaDestino.numeroConta}`,
    accountId: contaOrigem.id,
    contaDestinoId: contaDestino.id,
  })

  await Transaction.create({
    tipo: 'pix_recebido',
    valor,
    descricao: `Pix recebido da conta ${contaOrigem.numeroConta}`,
    accountId: contaDestino.id,
    contaDestinoId: contaOrigem.id,
  })

  return {
    message: 'Pix realizado com sucesso',
  }
}
async index({ auth }: HttpContext) {
  const user = auth.getUserOrFail()

  const account = await Account.findBy('userId', user.id)

  if (!account) {
    return []
  }

  const transactions = await Transaction.query()
    .where('accountId', account.id)
    .orderBy('createdAt', 'desc')

  return transactions
}
}