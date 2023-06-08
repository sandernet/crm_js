import React, { useState } from 'react';
import ContextProduct from './ContextProduct';
import ContextMP from './ContextMP';

import { Container, Row, Col } from 'reactstrap';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';

const baseIrl = "http://localhost:5000"


const Avito = () => {
    return (
        <ContextProduct.Consumer>
            {(context) => (
                // <ContextMP.Consumer>
                //     {(contextMPlase) => (
                <Card className="my-2">
                    <Container>
                        <Row>
                            {context.images.map((item, index) => (
                                JSON.stringify(item)
                            ))
                            }

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
