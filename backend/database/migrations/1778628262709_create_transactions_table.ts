import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transactions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('tipo').notNullable()

      table.decimal('valor', 10, 2).notNullable()

      table.string('descricao').nullable()

      table
        .integer('account_id')
        .unsigned()
        .references('id')
        .inTable('accounts')
        .onDelete('CASCADE')

      table
        .integer('conta_destino_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('accounts')
        .onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}