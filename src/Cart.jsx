export default function Cart({ items, onIncrease, onRemove }) {
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <aside className="cart">
      <div className="cart__head">
        <h2>Кошик</h2>
        <p>{items.length} поз.</p>
      </div>

      {items.length === 0 ? (
        <p className="cart__empty">Поки порожньо. Кількість і кнопка на картці додають товар сюди.</p>
      ) : (
        <ul className="cart__list">
          {items.map((item) => (
            <li key={item.lineId} className="cart__row">
              <div>
                <p className="cart__title">{item.title}</p>
                <p className="cart__meta">
                  {item.qty} × {item.price} UAH
                </p>
              </div>
              <p className="cart__sum">{item.qty * item.price}</p>
              <div className="cart__actions">
                <button type="button" onClick={(event) => onIncrease(event, item)}>
                  +1
                </button>
                <button type="button" onClick={(event) => onRemove(event, item)}>
                  Прибрати
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <p className="cart__total">
        Разом <strong>{total} UAH</strong>
      </p>
    </aside>
  )
}
