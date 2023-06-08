import Link from 'next/link';
import { useRouter } from "next/router"
import { Table } from 'reactstrap';
import MainContainer from "../../components/MainContainer"
import Images from "../../components/Images"
import Pages from "../../components/product/Pages"

const Product = ({ products }) => {

    const { query } = useRouter()
    console.log("********query.page********")
    console.log(query.page)

    const productsArray = products.rows;

    // Вычисление общего количества элементов
    const totalItems = 566 //products.count; // Замените на ваше реальное количество элементов
    const itemsPerPage = 10; // Количество элементов на странице

    return (
        <>
            <MainContainer>
                <h1>Список товаров</h1>
                <Pages context={{ limit: itemsPerPage, totalCount: totalItems, currentPage: query.page }}></Pages>

                <Table bordered>
                    <thead>
                        <tr>
                            <th>
                                id
                            </th>
                            <th>
                                картинка
                            </th>
                            <th>
                                Наименование товара
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {productsArray.map((product, index) => (

                            < tr key={product?.id} >
                                <td>{product?.id}</td>
                                <td>
                                    {/* {product?.images.length > 0 ? JSON.stringify(product?.['images'][0]['id']) : ''} */}
                                    <Images id={product?.images.length > 0 ? product?.images[0]['id'] : undefined}></Images>
                                </td>
                                <td>
                                    <Link href={`/products/${product.id}`}>
                                        {product?.name}
                                    </Link>
                                </td>
                            </tr>
                        )
                        )}

                    </tbody>
                    {/* Отображение пагинации */}

                </Table>

                <Pages context={{ limit: itemsPerPage, totalCount: totalItems, currentPage: query.page }}></Pages>

            </MainContainer>
        </>
    );
}

export default Product;

export async function getServerSideProps(context) {
    const { query } = context;

    console.log('======context.pathname=========')
    const page = query.page === undefined ? 1 : query.page
    const limit = query.limit === undefined ? 20 : query.limit
    const offset = limit * (page - 1)

    const params = new URLSearchParams();
    params.append('limit', limit);
    params.append('images', true);
    params.append('offset', offset);

    console.log(params)

    const response = await fetch(`http://localhost:5000/api/product?${params.toString()}`)
    const products = await response.json()
    return {
        props: { products }
    }
}