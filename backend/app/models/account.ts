import { AccountSchema } from '#database/schema'
import User from './user.js'

import { belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Account extends AccountSchema {
  @column({ columnName: 'numero_conta' })
  declare numeroConta: string

  @column()
  declare agencia: string

  @column()
  declare saldo: number

  @column({ columnName: 'user_id' })
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}