import Head from 'next/head';
import Link from 'next/link';
import { getIngredientBySlug, ingredientPages } from '../../data/ingredients';

const siteUrl = 'https://www.vedhenna.com';

export default function IngredientPage({ ingredient }) {
  const title = `${ingredient.name} | Vedhenna Ingredient`;
  const description = `${ingredient.name} (${ingredient.botanicalName}) in Vedhenna natural hair care: botanical properties and hair-care benefits.`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${siteUrl}/ingredients/${ingredient.slug}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${siteUrl}/ingredients/${ingredient.slug}`} />
      </Head>
      <main className="ingredient-page">
        <header className="ingredient-page-header">
          <Link href="/#ingredients">Back to ingredients</Link>
          <p className="eyebrow">Vedhenna Ingredient</p>
          <h1>{ingredient.name}</h1>
          <p className="botanical-name">{ingredient.botanicalName}</p>
          <p>{ingredient.summary}</p>
        </header>

        <section className="ingredient-detail-grid">
          {ingredient.image ? (
            <figure className="botanical-photo-frame">
              <img className="botanical-photo" src={ingredient.image} alt={`${ingredient.name} botanical ingredient`} />
              {ingredient.imageCredit ? (
                <figcaption>
                  <a href={ingredient.imageCreditUrl} target="_blank" rel="noreferrer">
                    {ingredient.imageCredit}
                  </a>
                </figcaption>
              ) : null}
            </figure>
          ) : (
            <div className={`botanical-visual ${ingredient.visual}`} aria-label={`${ingredient.name} botanical illustration`}>
              <span>{ingredient.name}</span>
            </div>
          )}

          <article className="ingredient-info-card">
            <h2>Botanical properties</h2>
            <ul>
              {ingredient.botanicalProperties.map((property) => (
                <li key={property}>{property}</li>
              ))}
            </ul>
          </article>

          <article className="ingredient-info-card">
            <h2>Hair-care benefits</h2>
            <ul>
              {ingredient.hairBenefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="ingredient-next">
          <h2>Explore more Vedhenna ingredients</h2>
          <div className="ingredient-list">
            {ingredientPages
              .filter((item) => item.slug !== ingredient.slug)
              .map((item) => (
                <Link className="ingredient-chip" href={`/ingredients/${item.slug}`} key={item.slug}>
                  {item.name}
                </Link>
              ))}
          </div>
        </section>
      </main>
    </>
  );
}

export function getStaticPaths() {
  return {
    paths: ingredientPages.map((ingredient) => ({
      params: { slug: ingredient.slug }
    })),
    fallback: false
  };
}

export function getStaticProps({ params }) {
  return {
    props: {
      ingredient: getIngredientBySlug(params.slug)
    }
  };
}
