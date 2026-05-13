import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function login() {
    const response = await fetch('http://localhost:3333/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      alert('Email ou senha inválidos')
      return
    }

    localStorage.setItem('token', data.data.token)
    localStorage.setItem('user', JSON.stringify(data.data.user))

    window.location.reload()
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>BANIF</h1>
        <p>Entre na sua conta</p>

        <input type="email" placeholder="Digite seu email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)} />

        <button onClick={login}>Entrar</button>
      </div>
    </div>
  )
}