import Catalog from './Catalog'
import './App.css'

function App() {
  return (
    <main className="page">
      <header className="top">
        <p className="eyebrow">Vite + React</p>
        <h1>shop-example</h1>
        <p className="lede">
          Клікни назву картки, зміни кількість і додай товар. Журнал праворуч показує подію.
        </p>
      </header>
      <Catalog />
    </main>
  )
}

export default App
