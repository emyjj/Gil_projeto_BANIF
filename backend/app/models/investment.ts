import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import Account from './account.js'

import { InvestmentSchema } from '#database/schema'

export default class Investment extends InvestmentSchema {
  @belongsTo(() => Account, {
    foreignKey: 'accountId',
  })
  declare account: BelongsTo<typeof Account>
}