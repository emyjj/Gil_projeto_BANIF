/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import TransactionsController from '#controllers/transactions_controller'


router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {
    router
      .group(() => {
        router.post('signup', [controllers.NewAccount, 'store'])
        router.post('login', [controllers.AccessTokens, 'store'])
      })
      .prefix('auth')
      .as('auth')
    router
      .group(() => {
        router.get('profile', [controllers.Profile, 'show'])
        router.post('logout', [controllers.AccessTokens, 'destroy'])
        router.post('deposit', [TransactionsController, 'deposit'])
        router.post('transfer', [TransactionsController, 'transfer'])
        router.get('transactions', [TransactionsController, 'index'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())
      
  })
  .prefix('/api/v1')
