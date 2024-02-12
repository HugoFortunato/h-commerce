'use client';

import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ProductType } from '../types/ProductType';
import Product from './Product';
import { fetchProducts } from '../lib/stripe';

export default function InfiniteScroll({
  initialProducts,
}: {
  initialProducts: ProductType[];
}) {
  const [products, setProducts] = useState<ProductType[]>(initialProducts);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const lastProductId = products[products.length - 1]?.id;

  const loadMoreProducts = useCallback(async () => {
    setIsLoading(true);

    const { formattedProducts, has_more } = await fetchProducts({
      lastProductId,
    });

    if (formattedProducts) {
      setProducts((prevProducts) => [...prevProducts, ...formattedProducts]);
      setHasMore(has_more);
    }

    setIsLoading(false);
  }, [lastProductId]);

  useEffect(() => {
    if (inView && !isLoading && hasMore) {
      loadMoreProducts();
    }
  }, [hasMore, inView, isLoading, loadMoreProducts]);

  if (!products) {
    return <div>carregando...</div>;
  }

  return (
    <>
      {products.map((product) => (
        <Product key={product.id} product={product}></Product>
      ))}

      {hasMore && <div ref={ref}>carregando mais registros...</div>}
    </>
  );
}
