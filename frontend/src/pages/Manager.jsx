import { useState } from 'react'

export default function Manager() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    cpf: '',
    cidade: '',
    estado: '',
    rua: '',
    telefone: '',
  })

async function createClient() {


  const response = await fetch(
    'http://localhost:3333/api/v1/auth/signup',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(form),
    }
  )

  const data = await response.json()

  if (!response.ok) {
    console.log(data)

    alert(
      data.mensagem ||
      data.message ||
      'Erro ao cadastrar cliente'
    )

    return
  }

  alert(
    data.mensagem ||
    'Cliente criado com sucesso!'
  )
}

  return (
    <div className="page">
      <div className="page-header">
        <h1>Cadastrar Cliente</h1>

        <p>
          Área exclusiva do gerente
        </p>
      </div>

      <div className="pix-box">
        <input
          placeholder="Nome completo"
          onChange={(e) =>
            setForm({
              ...form,
              fullName: e.target.value,
            })
          }
        />

        <input
          placeholder="Email"
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          placeholder="Senha"
          type="password"
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
              passwordConfirmation:
                e.target.value,
            })
          }
        />

        <input
          placeholder="CPF"
          onChange={(e) =>
            setForm({
              ...form,
              cpf: e.target.value,
            })
          }
        />

        <input
          placeholder="Cidade"
          onChange={(e) =>
            setForm({
              ...form,
              cidade: e.target.value,
            })
          }
        />

        <input
          placeholder="Estado"
          onChange={(e) =>
            setForm({
              ...form,
              estado: e.target.value,
            })
          }
        />

        <input
          placeholder="Rua"
          onChange={(e) =>
            setForm({
              ...form,
              rua: e.target.value,
            })
          }
        />

        <input
          placeholder="Telefone"
          onChange={(e) =>
            setForm({
              ...form,
              telefone: e.target.value,
            })
          }
        />

        <button onClick={createClient}>
          Criar Cliente
        </button>
      </div>
    </div>
  )
}