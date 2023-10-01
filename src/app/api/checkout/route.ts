import { NextResponse, NextRequest } from 'next/server';
import Stripe from 'stripe';
import { IProduct } from '@/interfaces/product';

export const POST = async (request: NextRequest) => {
    // @ts-ignore
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    try {
        const requestBody = await request.json();
        const { email, items } = requestBody as {
            email: string;
            items: IProduct[];
        };
        const extractingItems = items.map((item) => ({
            quantity: item.quantity,
            price_data: {
                currency: 'usd',
                unit_amount: item.price * 100,
                product_data: {
                    name: item.title,
                    description: item.description,
                    images: [item.image],
                },
            },
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: extractingItems,
            mode: 'payment',
            success_url: `${process.env.NEXTAUTH_URL}/success`,
            cancel_url: `${process.env.NEXTAUTH_URL}/checkout`,
            metadata: {
                email,
            },
        });

        return NextResponse.json({
            message: 'Connection is Active!',
            success: true,
            id: session.id,
        });
    } catch (error) {
        const { message } = error as { message: string };
        return NextResponse.json({ message }, { status: 500 });
    }
};
