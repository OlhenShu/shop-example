import { useRef, useState } from 'react'
import Cart from './Cart'
import ProductCard from './ProductCard'

const products = [
  { id: 'mug', title: 'Ceramic mug', price: 250, accent: '#c25b3a' },
  { id: 'notebook', title: 'Notebook', price: 120, accent: '#3f6b58' },
  { id: 'pen', title: 'Pen', price: 10, accent: '#315c8a' },
  { id: 'pencil', title: 'Pencil', price: 5, accent: '#b5812f' },
  { id: 'eraser', title: 'Eraser', price: 3, accent: '#8a4f73' },
  { id: 'ruler', title: 'Ruler', price: 15, accent: '#4d6a4a' },
  { id: 'calculator', title: 'Calculator', price: 20, accent: '#3d4c5c' },
  { id: 'stapler', title: 'Stapler', price: 10, accent: '#9a4632' },
  { id: 'scissors', title: 'Scissors', price: 8, accent: '#5c4d86' },
  { id: 'glue', title: 'Glue', price: 5, accent: '#2f6f73' },
]

function ProductCartButton({ productId, onAdd, onTrace }) {
  function handleQty(event) {
    onTrace(`${event.type} · ${event.target.name} · ${event.target.value}`)
  }

  function handleButtonClick(event) {
    onTrace(
      `${event.type} · target ${event.target.tagName} · currentTarget ${event.currentTarget.tagName}`,
    )
  }

  return (
    <form className="add" onSubmit={onAdd}>
      <label htmlFor={`qty-${productId}`}>К-сть</label>
      <input
        id={`qty-${productId}`}
        name="qty"
        type="number"
        min="1"
        defaultValue="1"
        onChange={handleQty}
      />
      <button type="submit" onClick={handleButtonClick}>
        Додати
      </button>
    </form>
  )
}

export default function Catalog() {
  const [cart, setCart] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [trace, setTrace] = useState([])
  const traceId = useRef(0)

  function pushTrace(line) {
    traceId.current += 1
    const id = traceId.current
    setTrace((prev) => [{ id, line }, ...prev].slice(0, 7))
  }

  function handleCardClick(event, product) {
    pushTrace(
      `${event.type} · target ${event.target.tagName} · currentTarget ${event.currentTarget.tagName}`,
    )
    setSelectedId(product.id)
  }

  function handleAdd(event, product) {
    event.preventDefault()
    const qty = Number(event.target.elements.qty.value)

    if (!Number.isInteger(qty) || qty < 1) {
      pushTrace('submit · кількість має бути цілим числом від 1')
      return
    }

    setCart((prev) => [
      ...prev,
      {
        lineId: crypto.randomUUID(),
        id: product.id,
        title: product.title,
        price: product.price,
        qty,
      },
    ])
    pushTrace(`submit · ${product.title} · qty ${qty}`)
  }

  function handleIncrease(event, item) {
    pushTrace(`${event.type} · +1 · ${item.title}`)
    setCart((prev) =>
      prev.map((entry) =>
        entry.lineId === item.lineId ? { ...entry, qty: entry.qty + 1 } : entry,
      ),
    )
  }

  function handleRemove(event, item) {
    pushTrace(`${event.type} · прибрати · ${item.title}`)
    setCart((prev) => prev.filter((entry) => entry.lineId !== item.lineId))
  }

  return (
    <div className="shop">
      <section className="catalog" aria-label="Товари">
        <div className="grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              accent={product.accent}
              selected={selectedId === product.id}
              onSelect={(event) => handleCardClick(event, product)}
            >
              <ProductCartButton
                productId={product.id}
                onAdd={(event) => handleAdd(event, product)}
                onTrace={pushTrace}
              />
            </ProductCard>
          ))}
        </div>
      </section>

      <div className="side">
        <Cart items={cart} onIncrease={handleIncrease} onRemove={handleRemove} />
        <section className="trace" aria-live="polite">
          <h2>Журнал подій</h2>
          {trace.length === 0 ? (
            <p>Подій ще немає.</p>
          ) : (
            <ul>
              {trace.map((entry) => (
                <li key={entry.id}>{entry.line}</li>
              ))}

            </ul>
          )}
        </section>
      </div>
    </div>
  )
}
