'use client';

import Image from 'next/image';
import { ProductType } from '../types/ProductType';
import { useState } from 'react';

type ProductImageProps = {
  product: ProductType;
  fill?: boolean;
};

export default function ProductImage({ product, fill }: ProductImageProps) {
  const [loading, setLoading] = useState(true);

  return fill ? (
    <Image
      src={product.image}
      alt={product.name}
      fill
      className={`object-cover ${
        loading
          ? 'scale-110 blur-3xl grayscale'
          : 'scale-100 blur-0 grayscale-0'
      }`}
      onLoadingComplete={() => setLoading(false)}
    />
  ) : (
    <Image
      src={product.image}
      alt={product.name}
      width={400}
      height={700}
      className={`object-cover ${
        loading
          ? 'scale-110 blur-3xl grayscale'
          : 'scale-100 blur-0 grayscale-0'
      }`}
      onLoadingComplete={() => setLoading(false)}
    />
  );
}
