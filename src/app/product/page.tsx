import { IProduct } from '@/interfaces/product';
import Container from '@/components/Container';
import Product from '@/components/Product';
import SingleProduct from '@/components/SingleProduct';
import { getSingleProudct, getTrendingProducts } from '@/utils';

type ProductPageProps = {
    searchParams: { [key: string]: string | string[] | undefined };
};

const ProductPage = async ({ searchParams }: ProductPageProps) => {
    const _idString = searchParams?._id;
    const _id = Number(_idString);
    const product = getSingleProudct(_id);
    const data: IProduct[] = await getTrendingProducts();

    return (
        <div>
            <Container>
                <SingleProduct product={product!} />
                <div>
                    <p className="text-xl py-1 font-semibold">
                        Tranding Products
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                        {data?.map((item) => (
                            <Product key={item._id} item={item} />
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ProductPage;
