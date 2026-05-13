import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'profile.transactions.deposit': { paramsTuple?: []; params?: {} }
    'profile.transactions.transfer': { paramsTuple?: []; params?: {} }
    'profile.transactions.index': { paramsTuple?: []; params?: {} }
    'profile.investments.invest': { paramsTuple?: []; params?: {} }
    'profile.investments.list': { paramsTuple?: []; params?: {} }
    'profile.investments.rescue': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'profile.transactions.index': { paramsTuple?: []; params?: {} }
    'profile.investments.list': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'profile.transactions.index': { paramsTuple?: []; params?: {} }
    'profile.investments.list': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'profile.transactions.deposit': { paramsTuple?: []; params?: {} }
    'profile.transactions.transfer': { paramsTuple?: []; params?: {} }
    'profile.investments.invest': { paramsTuple?: []; params?: {} }
    'profile.investments.rescue': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}