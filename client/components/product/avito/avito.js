import React, { useState } from 'react';
import ContextProduct from '../../../context/ContextProduct';
import ContextMP from '../../../context/ContextMP';

import { Container, Row, Col } from 'reactstrap';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';

const baseIrl = "http://localhost:5000"

let marketPlaceId, productId

const Avito = ({ property, mPId, pId }) => {
    console.log('-------property MP---777s-----------')

    marketPlaceId = mPId
    productId = pId

    console.log(property)
    console.log(marketPlaceId)
    console.log(productId)
    return (
        <ContextProduct.Consumer>
            {(context) => (
                // <ContextMP.Consumer>
                //     {(contextMPlase) => (
                <Card className="my-2">
                    <Container>
                        <Row>
                            {/* {property.rows.map((item, index) => (
                                <p class="text-danger">{JSON.stringify(item)}</p>
                            ))
                            } */}
                        </Row>
                    </Container>
                </Card>

                // </ContextMP.Consumer>
            )
            }
        </ContextProduct.Consumer >
    )
}

export default Avito;

export async function getServerSideProps(params) {
    console.log('-------Свойства для авито???-----------')
    console.log(marketPlaceId, productId)
    const response = await fetch(`http://localhost:5000/api/avito/property?marketPlace=${marketPlaceId}&product=${productId}`)
    // const response = await fetch(`http://localhost:5000/api/crm/property?marketPlace=${params.id}`)
    const property = await response.json()
    console.log(property)
    console.log('-------Свойства для авито???-----------')
    return {
        props: { property }
    }
}