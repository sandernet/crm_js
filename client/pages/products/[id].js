import { useState } from "react"
import { useRouter } from "next/router"
import MainContainer from "../../components/MainContainer"
import NavbarProduct from "../../components/product/NavbarProduct"
import ProductComp from "../../components/product/Product"
import ContextProduct from "../../context/ContextProduct"
import ContextMP from "../../context/ContextMP"
import Avito from "../../components/product/avito/avito"

import { Container, Row } from 'reactstrap';

export default function Product({ product }) {
    const { query } = useRouter()
    const listMP = [{ id: 1, name: 'Avito' }, { id: 2, name: 'Avito-2' }];


    return (
        <MainContainer>

            {/* {JSON.stringify(product)} */}

            <ContextProduct.Provider value={product.rows[0]}>
                <ContextMP.Provider value={listMP}>
                    <Container fluid>
                        <div className="container-fluid">
                            <Row >
                                <div className="row justify-content-md-center">
                                    <div className="col">
                                        <h1>{product.rows[0]['name']}</h1>
                                    </div>
                                </div>
                            </Row>
                            <Row >
                                <div className="col">
                                    <NavbarProduct></NavbarProduct>
                                </div>
                            </Row >
                            <Row>
                                <div className="col-6">
                                    <ProductComp></ProductComp>
                                </div>
                                <div className="col-6">
                                    <Avito marketPlaceId={listMP[0].id} productId={product.rows[0]['id']} />
                                </div>
                            </Row>
                        </div>
                    </Container>

                </ContextMP.Provider>
            </ContextProduct.Provider>
        </MainContainer >
    )
}



export async function getServerSideProps({ params }) {

    const response = await fetch(`http://localhost:5000/api/crm/product?id=${params.id}&full=true`)
    const product = await response.json()
    console.log('-------product-----------')
    console.log(product)
    return {
        props: { product }
    }
}