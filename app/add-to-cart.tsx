'use client';

import { track } from '@vercel/analytics';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { addToCart } from '@/lib/actions';
import { useProductDetailPageContext } from '@/components/utils/product-detail-page-context';
import { AddToCartButton } from '@/components/product-detail-page/add-to-cart-button';

export function AddToCart() {
  const router = useRouter();
  const { color, size } = useProductDetailPageContext();
  const [isLoading, setIsLoading] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    track('add_to_cart:viewed');
  }, []);

  return (
    <div className="space-y-2">
      <AddToCartButton
        isLoading={isLoading}
        onClick={async () => {
          setIsLoading(true);
          setClickCount(prev => prev + 1);
          track('add_to_cart:clicked');
          await addToCart({ id: 'shirt', color, size, quantity: 1 });
          router.push('/cart');
       }}
      />
      {clickCount > 0 && (
        <div className="text-sm text-gray-600 text-center">
          Button clicked {clickCount} times
        </div>
      )}
    </div>
  );
} 