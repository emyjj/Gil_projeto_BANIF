export default function Dashboard({ user, profile }) {
  return (
    <div className="page">
      <h1>Olá, {user.fullName}</h1>

      {profile && (
        <div className="cards">
          <div className="card balance-card">
            <span>Saldo disponível</span>
            <strong>R$ {profile.account.saldo}</strong>
          </div>

          <div className="card">
            <span>Agência</span>
            <strong>{profile.account.agencia}</strong>
          </div>

          <div className="card">
            <span>Conta</span>
            <strong>{profile.account.numeroConta}</strong>
          </div>
        </div>
      )}
    </div>
  )
}