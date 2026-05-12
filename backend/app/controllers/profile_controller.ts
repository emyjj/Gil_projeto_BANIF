import Account from '#models/account'
import UserTransformer from '#transformers/user_transformer'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProfileController {
  async show({ auth, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    const account = await Account.findBy('userId', user.id)

    return serialize({
      user: UserTransformer.transform(user),
      account,
    })
  }
}