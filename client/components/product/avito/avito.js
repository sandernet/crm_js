import React, { useState } from 'react';
import ContextProduct from '../ContextProduct';
import ContextMP from '../ContextMP';

import { Container, Row, Col } from 'reactstrap';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';

const baseIrl = "http://localhost:5000"


const Avito = ({ property }) => {
    console.log('-------property MP--------------')
    console.log(property)
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
    console.log(params)
    const response = await fetch(`http://localhost:5000/api/avito/property?marketPlace=1`)
    // const response = await fetch(`http://localhost:5000/api/crm/property?marketPlace=${params.id}`)
    const property = await response.json()
    console.log(property)
    console.log('-------Свойства для авито???-----------')
    return {
        props: { property }
    }
}