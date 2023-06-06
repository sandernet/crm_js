import Link from "next/link"
import { useRouter } from "next/router"
import MainContainer from "../../../components/MainContainer"
import NavbarProduct from "../../../components/product/NavbarProduct"
import ProductComp from "../../../components/product/Product"
import ContextProduct from "../../../components/product/ContextProduct"
import ContextMP from "../../../components/product/ContextMP"

import { ListGroup, ListGroupItem } from 'reactstrap';

export default function Product({ product }) {
    const { query } = useRouter()
    const listMP = [{ id: 1, name: 'Avito' }, { id: 2, name: 'Avito-2' }];
    return (
        <MainContainer>
            <ContextProduct.Provider value={product.rows[0]}>
                <ContextMP.Provider value={listMP}>
                    <NavbarProduct></NavbarProduct>

                    <h1>{product.rows[0]['name']}</h1>

                    <ProductComp></ProductComp>

                </ContextMP.Provider>
            </ContextProduct.Provider>
        </MainContainer>
    )
}



export async function getServerSideProps({ params }) {
    const response = await fetch(`http://localhost:5000/api/product?id=${params.id}&full=true`)
    const product = await response.json()
    console.log(product)
    return {
        props: { product }
    }
}