import { useState } from 'react'

export default function Pix() {
  const [numeroConta, setNumeroConta] = useState('')
  const [valor, setValor] = useState('')

  async function transferir() {
    const token = localStorage.getItem('token')

    const response = await fetch('http://localhost:3333/api/v1/account/transfer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        numeroConta,
        valor,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      alert(data.message)
      return
    }

    alert('Pix realizado com sucesso!')
    window.location.reload()
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Pix</h1>
        <p>Transfira valores para outra conta BANIF</p>
      </div>

      <div className="pix-box">
        <label>Número da conta destino</label>
        <input
          placeholder="Ex: 454059"
          value={numeroConta}
          onChange={(e) => setNumeroConta(e.target.value)}
        />

        <label>Valor</label>
        <input
          type="number"
          placeholder="Ex: 50"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />

        <button onClick={transferir}>Transferir Pix</button>
      </div>
    </div>
  )
}