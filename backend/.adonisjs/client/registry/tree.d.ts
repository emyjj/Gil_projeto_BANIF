/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    newAccount: {
      store: typeof routes['auth.new_account.store']
    }
    accessTokens: {
      store: typeof routes['auth.access_tokens.store']
    }
  }
  profile: {
    profile: {
      show: typeof routes['profile.profile.show']
    }
    accessTokens: {
      destroy: typeof routes['profile.access_tokens.destroy']
    }
    transactions: {
      deposit: typeof routes['profile.transactions.deposit']
      transfer: typeof routes['profile.transactions.transfer']
      index: typeof routes['profile.transactions.index']
    }
    investments: {
      invest: typeof routes['profile.investments.invest']
      list: typeof routes['profile.investments.list']
      rescue: typeof routes['profile.investments.rescue']
    }
  }
}
