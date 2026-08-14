import { Link } from 'react-router-dom'

export default function PageHero({ title, description, crumb }) {
  return (
    <section className="page-hero">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          {crumb ? ` / ${crumb}` : ''}
        </div>
        <h1>{title}</h1>
        {description ? <p>{description}</p> : null}
      </div>
    </section>
  )
}
