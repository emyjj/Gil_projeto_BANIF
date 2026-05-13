import TransactionRepository from '../repositories/transaction_repository.js'

export default class TransactionService {
  private repository = new TransactionRepository()

  async deposit(userId: number, valor: number) {
    const account = await this.repository.findAccountByUserId(userId)

    if (!account) {
      throw new Error('Conta não encontrada')
    }

    account.saldo = Number(account.saldo) + Number(valor)

    await this.repository.saveAccount(account)

    return account
  }

  async transfer(userId: number, numeroContaDestino: string, valor: number) {
    const contaOrigem = await this.repository.findAccountByUserId(userId)

    if (!contaOrigem) {
      throw new Error('Conta origem não encontrada')
    }

    const contaDestino =
      await this.repository.findAccountByNumeroConta(numeroContaDestino)

    if (!contaDestino) {
      throw new Error('Conta destino não encontrada')
    }

    if (contaOrigem.id === contaDestino.id) {
      throw new Error('Você não pode transferir para sua própria conta')
    }

    if (Number(contaOrigem.saldo) < Number(valor)) {
      throw new Error('Saldo insuficiente')
    }

    contaOrigem.saldo = Number(contaOrigem.saldo) - Number(valor)
    contaDestino.saldo = Number(contaDestino.saldo) + Number(valor)

    await this.repository.saveAccount(contaOrigem)
    await this.repository.saveAccount(contaDestino)

    await this.repository.createTransaction({
      tipo: 'pix_enviado',
      valor,
      descricao: `Pix enviado para conta ${contaDestino.numeroConta}`,
      accountId: contaOrigem.id,
      contaDestinoId: contaDestino.id,
    })

    await this.repository.createTransaction({
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

  async list(userId: number) {
    const account = await this.repository.findAccountByUserId(userId)

    if (!account) {
      return []
    }

    return this.repository.listTransactions(account.id)
  }
}