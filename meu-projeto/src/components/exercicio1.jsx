import { useEffect, useState } from 'react'

function Exercicio1() {
  const [usuarios, setUsuarios] = useState([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    async function buscarUsuarios() {
      setCarregando(true)

      const resposta = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      )
      const dados = await resposta.json()

      setUsuarios(dados)
      setCarregando(false)
    }

    buscarUsuarios()
  }, [])

  if (carregando) {
    return <p>Carregando...</p>
  }

  return (
    <ul>
      {usuarios.map((usuario) => (
        <li key={usuario.id}>{usuario.name}</li>
      ))}
    </ul>
  )
}

export default Exercicio1