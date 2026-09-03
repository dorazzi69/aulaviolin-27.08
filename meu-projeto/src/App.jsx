import './App.css'
import Exercicio1 from './components/exercicio1'
import Exercicio2 from './components/exercicio2'
import Exercicio3 from './components/exercicio3'
import Exercicio4 from './components/exercicio4'
import Exercicio5 from './components/exercicio5'

function App() {
  return (
    <section id="center">
      <h1>Exercício 1 </h1>
      <Exercicio1 />

      <h1>Exercício 2 </h1>
      <Exercicio2 />

      <h1>Exercício 3 </h1>
      <Exercicio3 />

      <h1>Exercício 4 </h1>
      <Exercicio4 />

      <h1>Exercício 5 </h1>
      <Exercicio5 />
    </section>
  )
}

export default App