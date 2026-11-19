export default function ProductCard({ title, price, accent, selected, onSelect, children }) {
  return (
    <article
      className={selected ? 'card card--selected' : 'card'}
      onClick={onSelect}
    >
      <div className="card__mark" style={{ background: accent }} aria-hidden="true">
        {title.slice(0, 1)}
      </div>
      <h2>{title}</h2>
      <p className="card__price">{price} UAH</p>
      {children}
    </article>
  )
}
