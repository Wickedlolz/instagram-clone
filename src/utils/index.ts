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

export const calculatePercentage = (oldPrice: number, price: number) => {
    return !!parseFloat(price.toString()) && !!parseFloat(oldPrice.toString())
        ? (100 - (oldPrice / price) * 100).toFixed(0)
        : 0;
};
