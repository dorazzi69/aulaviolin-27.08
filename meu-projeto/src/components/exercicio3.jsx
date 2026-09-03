import { useEffect, useState } from 'react'

function Exercicio3() {
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

  if (carregando) {
    return <p>Carregando...</p>
  }

  if (erro) {
    return <p>Erro: {erro}</p>
  }

  return (
    <ul>
      {usuarios.map((usuario) => (
        <li key={usuario.id}>{usuario.name}</li>
      ))}
    </ul>
  )
}

export default Exercicio3