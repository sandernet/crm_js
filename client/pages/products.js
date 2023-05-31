import { useState } from 'react'
import Link from "next/link"
import MainContainer from "../components/MainContainer"


const Product = ({ products }) => {
    const productsArray = products.rows;
    return (
        <>
            <MainContainer>
                <h1>Список товаров</h1>
                <h2>{products.count}</h2>
                <ul>
                    {productsArray.map(product =>
                        <li key={product.id}>
                            <Link href={`/products/${product.id}`}>
                                {product?.name}
                            </Link>
                        </li>
                    )}
                </ul>
            </MainContainer>
        </>
    );
}

export default Product;

export async function getStaticProps(context) {
    const response = await fetch('http://localhost:5000/api/product/')
    const products = await response.json()
    return {
        props: { products }
    }
}