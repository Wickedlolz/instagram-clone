import { IProduct } from '@/interfaces/product';
import Container from '@/components/Container';
import Product from '@/components/Product';
import SingleProduct from '@/components/SingleProduct';
import { getTrendingProducts } from '@/utils';

type ProductPageProps = {
    searchParams: { [key: string]: string | string[] | undefined };
};

const ProductPage = async ({ searchParams }: ProductPageProps) => {
    const product: IProduct = {
        _id: 1,
        title: 'Long sleeve Jacket',
        isNew: true,
        oldPrice: '200',
        price: 150,
        description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.',
        category: 'women',
        image: 'https://img.freepik.com/free-photo/portrait-beautiful-face-young-woman-with-long-brown-hair_186202-4331.jpg?size=626&ext=jpg&ga=GA1.1.453157835.1694346094&semt=sph',
        rating: 4,
        quantity: 1,
    };
    const data: IProduct[] = await getTrendingProducts();

    return (
        <div>
            <Container>
                <SingleProduct product={product} />
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
