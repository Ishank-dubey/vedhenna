import HowToApplyContent from '../../components/HowToApplyContent';
import { getProductBySlug, products } from '../../data/products';

export default function ProductHowToApplyPage({ selectedProduct }) {
  return <HowToApplyContent selectedProduct={selectedProduct} />;
}

export function getStaticPaths() {
  return {
    paths: products
      .filter((product) => product.slug !== 'vedhenna-henna-paste')
      .map((product) => ({
        params: { product: product.slug }
      })),
    fallback: false
  };
}

export function getStaticProps({ params }) {
  return {
    props: {
      selectedProduct: getProductBySlug(params.product)
    }
  };
}
