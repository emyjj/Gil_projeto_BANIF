import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import Account from './account.js'

import { TransactionSchema } from '#database/schema'

export default class Transaction extends TransactionSchema {
  @belongsTo(() => Account, {
    foreignKey: 'accountId',
  })
  declare account: BelongsTo<typeof Account>

  @belongsTo(() => Account, {
    foreignKey: 'contaDestinoId',
  })
  declare contaDestino: BelongsTo<typeof Account>
}