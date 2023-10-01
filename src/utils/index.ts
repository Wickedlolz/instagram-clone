import { productData } from '@/constants/data';
import { IProduct } from '@/interfaces/product';

export const getProducts = async () => {
    const response = await fetch(
        'https://fakestoreapiserver.reactbd.com/smart'
    );

    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }

    return response.json();
};

export const getTrendingProducts = async () => {
    const res = await fetch(
        'https://fakestoreapiserver.reactbd.com/smarttrending'
    );
    if (!res.ok) {
        throw new Error('Faild to fetch products');
    }
    return res.json();
};

export const getSingleProudct = (_id: number) => {
    const item = productData.find((product) => product._id === _id);
    return item;
};

export const calculatePercentage = (oldPrice: number, price: number) => {
    return !!parseFloat(price.toString()) && !!parseFloat(oldPrice.toString())
        ? (100 - (oldPrice / price) * 100).toFixed(0)
        : 0;
};

export const calculateTotalAmount = (products: IProduct[]) => {
    return products.reduce((acc, value) => {
        return (acc += value.price * value.quantity);
    }, 0);
};
