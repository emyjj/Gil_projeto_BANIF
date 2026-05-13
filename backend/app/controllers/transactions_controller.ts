import TransactionService from '#services/transaction_service'

import type { HttpContext } from '@adonisjs/core/http'

export default class TransactionsController {
  private transactionService = new TransactionService()

  async deposit({ auth, request, response }: HttpContext) {
    try {
      const user = auth.getUserOrFail()

      const valor = Number(request.input('valor'))

      const account =
        await this.transactionService.deposit(
          user.id,
          valor
        )

      return {
        message: 'Depósito realizado com sucesso',
        saldo: account.saldo,
      }
} catch (error) {
  const message =
    error instanceof Error
      ? error.message
      : 'Erro inesperado'

  return response.badRequest({
    message,
  })
}
  }

  async transfer({ auth, request, response }: HttpContext) {
    try {
      const user = auth.getUserOrFail()

      await this.transactionService.transfer(
        user.id,
        request.input('numeroConta'),
        Number(request.input('valor'))
      )

      return {
        message: 'Pix realizado com sucesso',
      }
        } catch (error) {
        const message =
            error instanceof Error
            ? error.message
            : 'Erro inesperado'

        return response.badRequest({
            message,
        })
        }
  }

  async index({ auth }: HttpContext) {
    const user = auth.getUserOrFail()

    return this.transactionService.list(user.id)
  }
}