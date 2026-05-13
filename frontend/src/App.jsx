import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Investments from './pages/Investments'

import Login from './components/Login'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Pix from './pages/Pix'
import Manager from './pages/Manager'

export default function App() {
  const [profile, setProfile] = useState(null)
  const [transactions, setTransactions] = useState([])

  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    async function loadData() {
      const token = localStorage.getItem('token')

      if (!token) return

      const profileResponse = await fetch('http://localhost:3333/api/v1/account/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const profileData = await profileResponse.json()

      if (profileResponse.ok) {
        setProfile(profileData.data)
      }

      const transactionsResponse = await fetch('http://localhost:3333/api/v1/account/transactions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const transactionsData = await transactionsResponse.json()

      if (transactionsResponse.ok) {
        setTransactions(transactionsData)
      }
    }

    loadData()
  }, [])

  if (!user) {
    return <Login />
  }

  return (
    <BrowserRouter>
      <div className="dashboard">
        <header className="topbar">
          <div className="topbar-left">
            <h2>BANIF</h2>
          </div>

          <nav className="top-menu">
            <Link to="/">Dashboard</Link>
            <Link to="/pix">Pix</Link>
            <Link to="/transactions">Extrato</Link>
            <Link to="/investments">Aplicações</Link>
            {user.role === 'gerente' && (
              <Link to="/manager">Cadastrar cliente</Link>
            )}
          </nav>

          <button
            className="logout-button"
            onClick={() => {
              localStorage.clear()
              window.location.reload()
            }}
          >
            Sair
          </button>
        </header>

        <Routes>
          <Route path="/" element={<Dashboard user={user} profile={profile} />} />
          <Route path="/pix" element={<Pix />} />
          <Route path="/transactions" element={<Transactions transactions={transactions} />} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/investments" element={<Investments />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}