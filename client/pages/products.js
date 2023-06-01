import Link from 'next/link';
import { useState } from 'react'
import { Table } from 'reactstrap';
import MainContainer from "../components/MainContainer"
import Images from "../components/Images"



const Product = ({ products }) => {
    const productsArray = products.rows;
    return (
        <>
            <MainContainer>
                <h1>Список товаров</h1>
                <h2>{products.count}</h2>

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

                            < tr key={index} >
                                <td>{product?.id}</td>
                                <td>
                                    <Images product={product}></Images>
                                </td>
                                <td><Link href={`/products/${product.id}`}>
                                    {product?.name}
                                </Link>
                                </td>
                            </tr>
                        )
                        )}

                    </tbody>
                </Table>
            </MainContainer>
        </>
    );
}

export default Product;

export async function getStaticProps(context) {
    const response = await fetch('http://localhost:5000/api/product/?full=true&limit=100')
    const products = await response.json()
    return {
        props: { products }
    }
}