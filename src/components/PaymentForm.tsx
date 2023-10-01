import { useAppDispatch, useAppSelector } from '@/store';
import { useSession } from 'next-auth/react';
import { loadStripe } from '@stripe/stripe-js';
import { resetCart, saveOrder } from '@/store/slices/shoppingSlice';
import { calculateTotalAmount } from '@/utils';
import FormattedPrice from './FormattedPrice';

const PaymentForm = () => {
    const dispatch = useAppDispatch();
    const { cartItems, user } = useAppSelector((state) => state.shopping);
    const { data: session } = useSession();
    const totalAmount = calculateTotalAmount(cartItems);
    const stripePromise = loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    );

    const handleCheckout = async () => {
        try {
            const stripe = await stripePromise;
            const response = await fetch('http://localhost:3000/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: cartItems,
                    email: session?.user?.email,
                }),
            });

            if (!response.ok) {
                throw { message: response.statusText };
            }

            const data = await response.json();
            dispatch(saveOrder({ order: cartItems, id: data.id }));
            stripe?.redirectToCheckout({ sessionId: data.id });
            dispatch(resetCart());
        } catch (error) {
            const { message } = error as { message: string };
            console.log(message);
        }
    };

    return (
        <div className="w-full bg-white p-4">
            <h2>Cart Totals</h2>
            <div className="border-b-[1px] border-b-slate-300 py-2">
                <div className="max-w-lg flex items-center justify-between">
                    <p className="uppercase font-medium">Subtotal</p>
                    <p>
                        <FormattedPrice amount={totalAmount} />
                    </p>
                </div>
            </div>
            <div className="border-b-[1px] border-b-slate-300 py-2">
                <div className="max-w-lg flex items-center justify-between">
                    <p className="uppercase font-medium">Shipping</p>
                    <p>
                        <FormattedPrice amount={20} />
                    </p>
                </div>
            </div>
            <div className="border-b-[1px] border-b-slate-300 py-2">
                <div className="max-w-lg flex items-center justify-between">
                    <p className="uppercase font-medium">Total Price</p>
                    <p>
                        <FormattedPrice amount={totalAmount + 20} />
                    </p>
                </div>
            </div>
            {user ? (
                <button
                    onClick={handleCheckout}
                    className="bg-black text-slate-100 mt-4 py-3 px-6 hover:bg-orange-950 cursor-pointer duration-200"
                >
                    Proceed to checkout
                </button>
            ) : (
                <div>
                    <button className="bg-black text-slate-100 mt-4 py-3 px-6 hover:bg-orange-950 cursor-not-allowed duration-200">
                        Proceed to checkout
                    </button>
                    <p className="text-base mt-1 text-red-500 font-semibold animate-bounce">
                        Please login to continue
                    </p>
                </div>
            )}
        </div>
    );
};

export default PaymentForm;
