import { useEffect, useState } from 'react'
import './App.css'

function StatusAPI() {
  const [itens, setItens] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    const controle = new AbortController()
    const signal = controle.signal

    async function buscar() {
      try {
        setCarregando(true)
        setErro(null)

        await new Promise(r => setTimeout(r, 1000))

        const resp = await fetch(
          'https://jsonplaceholder.typicode.com/users',
          { signal }
        )

        if (!resp.ok) {
          throw new Error(`HTTP ${resp.status}`)
        }

        const data = await resp.json()
        setItens(data)
      } catch (e) {
        if (e.name !== 'AbortError') {
          setErro(e.message)
        }
      } finally {
        setCarregando(false)
      }
    }

    buscar()

    return () => controle.abort()
  }, [])

  if (carregando) {
    return <p>Carregando...</p>
  }

  if (erro) {
    return <p>Erro: {erro}</p>
  }

  if (itens.length === 0) {
    return <p>Nenhum item encontrado.</p>
  }

  return <p>Sucesso: {itens.length} itens carregados.</p>
}

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

        <h1>Exercício 5 - Status da API</h1>

        <StatusAPI />

      </section>
    </>
  )
}

export default App