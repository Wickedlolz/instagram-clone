import { getProducts } from '@/utils';
import { IProduct } from '@/interfaces/product';

import Container from './Container';
import Product from './Product';

const Products = async () => {
    const products: IProduct[] = await getProducts();

    return (
        <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 -mt-10">
            {products?.map((product) => (
                <Product key={product._id} item={product} />
            ))}
        </Container>
    );
};

export default Products;
