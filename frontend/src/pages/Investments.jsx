
import { useEffect, useState } from 'react'

export default function Investments() {
  const [tipo, setTipo] = useState('poupanca')
  const [valor, setValor] = useState('')
  const [investments, setInvestments] = useState([])

  useEffect(() => {
  loadInvestments()
}, [])

async function loadInvestments() {
  const token = localStorage.getItem('token')

  const response = await fetch(
    'http://localhost:3333/api/v1/account/investments',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  const data = await response.json()

  if (response.ok) {
    setInvestments(data)
  }
}

  async function investir() {
    const token = localStorage.getItem('token')

    const response = await fetch('http://localhost:3333/api/v1/account/investments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        tipo,
        valor: Number(valor),
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      alert(data.message)
      return
    }

    alert('Aplicação realizada com sucesso!')
    window.location.reload()
  }

  async function resgatar(id) {
  const token = localStorage.getItem('token')

  const response = await fetch(
    `http://localhost:3333/api/v1/account/investments/${id}/rescue`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  const data = await response.json()

  if (!response.ok) {
    alert(data.message)
    return
  }

  alert('Valor resgatado com sucesso!')

  loadInvestments()

  window.location.reload()
}

  return (
    <div className="page">
      <div className="page-header">
        <h1>Aplicações</h1>
        <p>Invista seu saldo em poupança, títulos ou ações</p>
      </div>

      <div className="pix-box">
        <label>Tipo de aplicação</label>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="poupança">Poupança</option>
          <option value="títulos">Títulos do governo</option>
          <option value="ações">Ações</option>
        </select>

        <label>Valor</label>
        <input
          type="number"
          placeholder="Ex: 100"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />

        <button onClick={investir}>Aplicar</button>

        <div className="transactions-list">
        {investments.map((investment) => (
          <div
            key={investment.id}
            className="transaction-item"
          >
                  <button
        onClick={() =>
          resgatar(investment.id)
        }
      >
        Resgatar
      </button>
            <div>
              <strong>
                {investment.tipo}
              </strong>

              <p>
                Aplicação financeira
              </p>
            </div>

            <strong>
              R$ {investment.valor}
            </strong>
          </div>
        ))}
      </div>
      </div>
    </div>
  )
}