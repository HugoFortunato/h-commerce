import { useCartStore } from '@/store';
import { formatPrice } from '../lib/utils';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

type CheckoutButtonProps = {
  totalPrice: number;
};

export default function CheckoutButton({ totalPrice }: CheckoutButtonProps) {
  const { user } = useUser();
  const router = useRouter();
  const cartStore = useCartStore();

  const handleCheckout = () => {
    if (!user) {
      cartStore.toggleCart();
      router.push('/sign-in?redirectUrl=/');
    } else {
      cartStore.setCheckout('checkout');
    }
  };

  return (
    <div>
      <div>
        <p className="text-teal-600 font-bold">
          Total: {formatPrice(totalPrice)}
        </p>
        <button
          onClick={handleCheckout}
          className="w-full rounded-md bg-teal-600 text-white py-2 mt-2"
        >
          Finalizar compra
        </button>
      </div>
    </div>
  );
}
