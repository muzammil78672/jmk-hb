import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { products } from '../data/products'

export default function Products() {
  return (
    <>
      <PageHero
        crumb="Products"
        title="Product Catalogue"
        description="Sandalwood and incense raw materials for manufacturers, traders and wholesalers in India — and for international partners. Powder, pieces, logs, chips, heartwood and related forms."
      />

      <section>
        <div className="container">
          <div className="product-grid">
            {products.map((p) => (
              <article className="product-card" id={p.id} key={p.id} data-reveal>
                <img src={p.img} alt={p.alt} loading="lazy" width={2400} height={1800} />
                <div className="body">
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                  <Link className="tag" to={`/contact?product=${encodeURIComponent(p.title)}`}>
                    Request quote
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
