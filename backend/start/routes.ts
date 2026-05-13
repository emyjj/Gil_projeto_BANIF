import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import TransactionsController from '#controllers/transactions_controller'
import InvestmentsController from '#controllers/investments_controller'

router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {
    router
      .group(() => {
        // Cadastro NÃO precisa de auth
        router.post('signup', [controllers.NewAccount, 'store'])

        // Login
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

        router.post('investments', [InvestmentsController, 'invest'])
        router.get('investments', [InvestmentsController, 'list'])
        router.post('investments/:id/rescue', [InvestmentsController, 'rescue'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())
  })
  .prefix('/api/v1')