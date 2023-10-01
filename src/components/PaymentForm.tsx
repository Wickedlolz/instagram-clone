import { useAppDispatch, useAppSelector } from '@/store';
import { calculateTotalAmount } from '@/utils';
import React from 'react';
import FormattedPrice from './FormattedPrice';

const PaymentForm = () => {
    const dispatch = useAppDispatch();
    const { cartItems, user } = useAppSelector((state) => state.shopping);
    const totalAmount = calculateTotalAmount(cartItems);

    const handleCheckout = () => {};

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
