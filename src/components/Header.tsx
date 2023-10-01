'use client';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useAppSelector } from '@/store';
import { calculateTotalAmount } from '@/utils';

import Container from './Container';
import FormattedPrice from './FormattedPrice';
import Logo from './Logo';
import { IoMdCart } from 'react-icons/io';
import { FiSearch, FiLogOut } from 'react-icons/fi';
import { AiOutlineUser } from 'react-icons/ai';

const Header = () => {
    const { data: session } = useSession();
    const cartItems = useAppSelector((state) => state.shopping.cartItems);
    const totalAmount = calculateTotalAmount(cartItems);

    return (
        <div className="bg-bodyColor h-20 sticky top-0 z-50">
            <Container className="h-full flex items-center justify-between md:gap-x-5 md:justify-start">
                <Logo />
                <div className="w-full hidden bg-white md:flex items-center gap-x-1 border-[1px] border-lightText/50 rounded-full px-4 p-1.5 focus-within:border-orange-600 group">
                    <FiSearch className="text-gray-500 group-focus-within:text-darkText duration-200" />
                    <input
                        type="search"
                        placeholder="Search for products"
                        className="placeholder:text-sm flex-1 outline-none"
                    />
                </div>
                {!session && (
                    <div
                        onClick={() => signIn()}
                        className="headerAuthDiv cursor-pointer"
                    >
                        <AiOutlineUser className="text-2xl" />
                        <p className="text-sm font-semibold">Login/Register</p>
                    </div>
                )}
                <Link href="/cart">
                    <div className="bg-black hover:bg-slate-950 rounded-full text-slate-100 hover:text-white flex items-center justify-center gap-x-1 px-3 py-1.5 border-[1px] hover:border-orange-600 duration-200 relative">
                        <IoMdCart className="text-2xl" />
                        <p className="text-sm font-semibold">
                            <FormattedPrice amount={totalAmount} />
                        </p>
                        <span className="bg-white text-orange-600 rounded-full text-xs font-semibold absolute -right-2 -top-1 w-5 h-5 flex items-center justify-center shadow-xl shadow-black">
                            {cartItems.length}
                        </span>
                    </div>
                </Link>
                {session && (
                    <>
                        <Image
                            src={session?.user?.image as string}
                            alt="user avatar"
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                        />
                        <div
                            onClick={() => signOut()}
                            className="headerAuthDiv cursor-pointer px-2 gap-x-1"
                        >
                            <FiLogOut className="text-2xl" />
                            <p className="text-sm font-semibold">Logout</p>
                        </div>
                    </>
                )}
            </Container>
        </div>
    );
};

export default Header;
