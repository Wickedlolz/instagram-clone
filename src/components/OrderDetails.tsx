'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/store';
import { calculateTotalAmount } from '@/utils';
import { resetOrder } from '@/store/slices/shoppingSlice';

import FormattedPrice from './FormattedPrice';

const OrderDetails = () => {
    const dispatch = useAppDispatch();
    const orders = useAppSelector((state) => state.shopping.orders);
    const totalAmount = calculateTotalAmount(orders?.order || []);

    return (
        <div>
            {orders?.order?.length! > 0 ? (
                <div>
                    <div className="grid grid-cols-7 uppercase text-sm font-medium py-2 border-b-[1px] border-b-gray-300">
                        <p className="col-span-4">Items</p>
                        <p className="flex items-center justify-center">
                            Quantity
                        </p>
                        <p className="flex items-center justify-center">
                            Unit Price
                        </p>
                        <p className="flex items-center justify-center">
                            Amount
                        </p>
                    </div>
                    <div className="py-2 flex flex-col justify-center gap-2">
                        {orders?.order?.map((item) => (
                            <div
                                key={item?._id}
                                className="py-2 border-b-[1px] border-gray-300 grid grid-cols-7 items-center"
                            >
                                <div className="col-span-4 flex items-start gap-2 text-sm">
                                    <Image
                                        src={item?.image}
                                        alt="product image"
                                        width={500}
                                        height={500}
                                        className="w-12 h-12 object-cover"
                                    />
                                    <div>
                                        <h3 className="text-base font-semibold mb-.5">
                                            {item?.title}
                                        </h3>
                                        <p>{item?.description}</p>
                                    </div>
                                </div>
                                <p className="flex items-center justify-center">
                                    {item?.quantity}
                                </p>
                                <p className="flex items-center justify-center">
                                    <FormattedPrice amount={item?.price} />
                                </p>
                                <p className="flex items-center justify-center">
                                    <FormattedPrice
                                        amount={item?.price * item.quantity}
                                    />
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="text-lg font-medium py-2 border-b-[1px] border-b-gray-300">
                        <p>Payment Details</p>
                    </div>
                    <p className="py-2">
                        Total Paid{' '}
                        <span className="text-xl font-semibold">
                            <FormattedPrice amount={totalAmount} />
                        </span>
                    </p>
                    <button
                        onClick={() => dispatch(resetOrder(null))}
                        className="mt-5 border-[1px] border-gray-500 py-1 px-4 font-medium rounded-md hover:border-orange-600 cursor-pointer duration-200"
                    >
                        Reset Order
                    </button>
                </div>
            ) : (
                <div className="py-10 bg-white text-black text-2xl text-center">
                    <p>Nothing to show</p>
                    <Link href={'/'}>
                        <button className="bg-black text-slate-100 w-44 h-12 rounded-full text-base font-semibold mt-2 hover:bg-orange-600 duration-300">
                            Continue Shopping
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default OrderDetails;
