import React, { useState } from 'react';
import ContextProduct from '../../context/ContextProduct';
import ContextMP from '../../context/ContextMP';

import { Container, Row, Col } from 'reactstrap';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';

const baseIrl = "http://localhost:5000"


const Product = () => {
    return (
        <ContextProduct.Consumer>
            {(context) => (
                // <ContextMP.Consumer>
                //     {(contextMPlase) => (
                <Card className="my-2">
                    <Container>
                        <Row>
                            {context.images.map((item, index) => (
                                item.typeImage === "miniature" ?
                                    <Col key={index} className="bg-light border">
                                        <CardImg
                                            alt={item.nameFiles}
                                            src={`${baseIrl}/api/crm/images/?id=${item.id}`}
                                            style={{
                                                height: 150,
                                                "object-fit": "contain"
                                            }}
                                            width="100%"
                                        />

                                    </Col>
                                    : null
                            ))}
                        </Row>
                    </Container>

                    <CardBody>
                        <CardText tag="h5">
                            {`Артикул - ${context.article}`}
                        </CardText>
                        <CardText>
                            {context.idMS}
                        </CardText>


                        {context.price.map((item, index) => (
                            <CardText key={item.id}>
                                {`${item.name} - ${item.price}`}
                            </CardText>
                        ))}


                    </CardBody>
                </Card>

                // </ContextMP.Consumer>
            )
            }
        </ContextProduct.Consumer >
    )
}

export default Product;
