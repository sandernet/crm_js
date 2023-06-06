import Link from "next/link"
import { useRouter } from "next/router"
import MainContainer from "../../../components/MainContainer"
import NavbarProduct from "../../../components/product/NavbarProduct"
import ProductCar from "../../../components/product/ProductCar"

import { ListGroup, ListGroupItem } from 'reactstrap';

export default function ProductMP() {
    const { query } = useRouter()
    return (
        <>
            <MainContainer>
                <h1>Product c id {query.id} mp {query.mp}</h1>

                <NavbarProduct></NavbarProduct>

                <ProductCar></ProductCar>

            </MainContainer>
        </>
    )
}



