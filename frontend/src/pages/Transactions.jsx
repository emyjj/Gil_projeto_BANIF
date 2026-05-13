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
              <strong>
                {transaction.tipo === 'pix_enviado'
                  ? 'Pix enviado'
                  : 'Pix recebido'}
              </strong>

              <p>{transaction.descricao}</p>
            </div>

            <span
              className={
                transaction.tipo === 'pix_recebido'
                  ? 'positive'
                  : 'negative'
              }
            >
              {transaction.tipo === 'pix_recebido' ? '+' : '-'} R${' '}
              {transaction.valor}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}