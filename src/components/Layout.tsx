'use client';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

type LayoutProps = {
    children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return <SessionProvider>{children}</SessionProvider>;
};

export default Layout;
