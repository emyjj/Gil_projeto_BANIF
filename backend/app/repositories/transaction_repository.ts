import Account from '#models/account'
import Transaction from '#models/transaction'

export default class TransactionRepository {
  async findAccountByUserId(userId: number) {
    return Account.findBy('userId', userId)
  }

  async findAccountByNumeroConta(numeroConta: string) {
    return Account.findBy('numeroConta', numeroConta)
  }

  async saveAccount(account: Account) {
    return account.save()
  }

  async createTransaction(data: {
    tipo: string
    valor: number
    descricao: string
    accountId: number
    contaDestinoId: number
  }) {
    return Transaction.create(data)
  }

  async listTransactions(accountId: number) {
    return Transaction.query()
      .where('accountId', accountId)
      .orderBy('createdAt', 'desc')
  }
}