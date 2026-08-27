import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [comentarios, setComentarios] = useState([])

  useEffect(() => {
    async function buscarComentarios() {
      const resposta = await fetch(
        'https://jsonplaceholder.typicode.com/comments?postId=1'
      )
      const dados = await resposta.json()
      setComentarios(dados)
    }

    buscarComentarios()
  }, [])

  const [usuariosReqres, setUsuariosReqres] = useState([])

  useEffect(() => {
    async function buscarUsuariosReqres() {
      const resposta = await fetch(
        'https://reqres.in/api/users?page=2'
      )
      const dados = await resposta.json()

      setUsuariosReqres(dados.data)
    }

    buscarUsuariosReqres()
  }, [])

  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    async function buscarUsuario() {
      const resposta = await fetch(
        'https://reqres.in/api/users/5'
      )
      const dados = await resposta.json()

      setUsuario(dados.data)
    }

    buscarUsuario()
  }, [])

  const [usuarios, setUsuarios] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    const controle = new AbortController()
    const signal = controle.signal

    async function buscarUsuarios() {
      try {
        setCarregando(true)
        setErro(null)

        const resposta = await fetch(
          'https://jsonplaceholder.typicode.com/users',
          { signal }
        )

        if (!resposta.ok) {
          throw new Error(`HTTP ${resposta.status}`)
        }

        const dados = await resposta.json()

        setUsuarios(dados)
      } catch (e) {
        if (e.name !== 'AbortError') {
          setErro(e.message)
        }
      } finally {
        setCarregando(false)
      }
    }

    buscarUsuarios()

    return () => controle.abort()
  }, [])

  return (
    <>
      <section id="center">

        <h1>Exercício 2 - Comentários</h1>

        <ul>
          {comentarios.map((comentario) => (
            <li key={comentario.id}>
              {comentario.name} - {comentario.email}
            </li>
          ))}
        </ul>

        <h1>Exercício 3 - Usuários</h1>

        <ul>
          {usuariosReqres.map((usuario) => (
            <li key={usuario.id}>
              {usuario.first_name} {usuario.last_name} - {usuario.email}
            </li>
          ))}
        </ul>

        <h1>Exercício 4 - Usuário único</h1>

        {usuario === null ? (
          <p>Carregando...</p>
        ) : (
          <>
            <h2>
              {usuario.first_name} {usuario.last_name}
            </h2>

            <p>{usuario.email}</p>
          </>
        )}

        <h1>Exercício 5 - Lista de usuários</h1>

        {carregando ? (
          <p>Carregando...</p>
        ) : erro ? (
          <p>Erro: {erro}</p>
        ) : (
          <ul>
            {usuarios.map((usuario) => (
              <li key={usuario.id}>
                {usuario.name}
              </li>
            ))}
          </ul>
        )}

      </section>
    </>
  )
}

export default App