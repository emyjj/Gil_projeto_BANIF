import { useEffect, useState } from 'react'

export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [profile, setProfile] = useState(null)

  async function login() {
    const response = await fetch('http://localhost:3333/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    const data = await response.json()

    console.log(data)

    if (!response.ok) {
      alert('Email ou senha inválidos')
      return
    }

    localStorage.setItem('token', data.data.token)

    localStorage.setItem(
      'user',
      JSON.stringify(data.data.user)
    )

    alert('Login realizado com sucesso!')

    window.location.reload()
  }

  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
  async function loadProfile() {
    const token = localStorage.getItem('token')

    if (!token) return

    const response = await fetch(
      'http://localhost:3333/api/v1/account/profile',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const data = await response.json()

    console.log(data)

    if (response.ok) {
      setProfile(data.data)
    }
  }

  loadProfile()
}, [])

  if (user) {
    return (
      <div
        style={{
          height: '100vh',
          backgroundColor: '#0f172a',
          color: 'white',
          padding: '40px',
        }}
      >
        <h1>Bem-vindo ao BANIF</h1>

        <h2>{user.fullName}</h2>

        <p>{user.email}</p>

        {profile && (
          <>
            <p>Agência: {profile.account.agencia}</p>

            <p>Conta: {profile.account.numeroConta}</p>

            <p>Saldo: R$ {profile.account.saldo}</p>
          </>
        )}

        <button
          onClick={() => {
            localStorage.clear()
            window.location.reload()
          }}
        >
          Sair
        </button>
      </div>
    )
  }

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4f5666',
      }}
    >
      <div
        style={{
          backgroundColor: '#1e293b',
          padding: '40px',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          width: '300px',
        }}
      >
        <h1
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontFamily: 'helvetica, sans-serif',
          }}
        >
          BANIF
        </h1>

        <input
          type="email"
          placeholder="Digite seu email"
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: 'none',
          }}
        />

        <input
          type="password"
          placeholder="Digite sua senha"
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: 'none',
          }}
        />

        <button
          onClick={login}
          style={{
            padding: '10px',
            backgroundColor: '#7e95bb',
            color: 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Entrar
        </button>
      </div>
    </div>
  )
}