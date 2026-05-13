function getTransactionTitle(tipo) {
  if (tipo === 'pix_enviado') return 'Pix enviado'
  if (tipo === 'pix_recebido') return 'Pix recebido'
  if (tipo === 'aplicacao') return 'Aplicação financeira'
  if (tipo === 'resgate') return 'Resgate de aplicação'
  if (tipo === 'deposito') return 'Depósito'

  return tipo
}

function isPositive(tipo) {
  return tipo === 'pix_recebido' || tipo === 'resgate' || tipo === 'deposito'
}

export default function Transactions({ transactions }) {
  return (
    <div className="page">
      <div className="page-header">
        <h1>Extrato</h1>
        <p>Veja suas movimentações bancárias</p>
      </div>

      <div className="statement-box">
        {transactions.length === 0 && (
          <p className="empty-message">Nenhuma movimentação encontrada.</p>
        )}

        {transactions.map((transaction) => (
          <div className="statement-item" key={transaction.id}>
            <div>
              <strong>{getTransactionTitle(transaction.tipo)}</strong>
              <p>{transaction.descricao}</p>
            </div>

            <span className={isPositive(transaction.tipo) ? 'positive' : 'negative'}>
              {isPositive(transaction.tipo) ? '+' : '-'} R$ {transaction.valor}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}