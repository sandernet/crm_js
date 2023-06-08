import { useState } from "react"
import { useRouter } from "next/router"
import MainContainer from "../../../components/MainContainer"
import NavbarProduct from "../../../components/product/NavbarProduct"
import ProductComp from "../../../components/product/Product"
import ContextProduct from "../../../components/product/ContextProduct"
import ContextMP from "../../../components/product/ContextMP"
import Avito from "../../../components/product/Avito"

import { Container, Row } from 'reactstrap';

export default function Product({ product }) {
    const { query } = useRouter()
    const listMP = [{ id: 1, name: 'Avito' }, { id: 2, name: 'Avito-2' }];

    const [showComponent2, setShowComponent2] = useState(true);

    const toggleComponent = () => {
        setShowComponent2(!showComponent2);
    };

    return (
        <MainContainer>

            {/* {JSON.stringify(product)} */}

            <ContextProduct.Provider value={product.rows[0]}>
                <ContextMP.Provider value={listMP}>
                    <Container fluid>
                        <div className="container-fluid">
                            <div className="row justify-content-md-center">
                                <div className="col">
                                    <h1>{product.rows[0]['name']}</h1>
                                </div>
                            </div>
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
                                    {showComponent2 ? <Avito /> : "<Component1 />"}
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

    console.log(params.id)
    const response = await fetch(`http://localhost:5000/api/product?id=${params.id}&full=true`)
    const product = await response.json()
    return {
        props: { product }
    }
}