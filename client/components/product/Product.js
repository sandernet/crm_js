import React, { useState } from 'react';
import ContextProduct from './ContextProduct';
import ContextMP from './ContextMP';

import { ListGroup, ListGroupItem } from 'reactstrap';

const Product = () => {

    // const [isOpen, setIsOpen] = useState(false);

    // const toggle = () => setIsOpen(!isOpen);
    return (
        <ContextProduct.Consumer>
            {(context) => (
                // <ContextMP.Consumer>
                //     {(contextMPlase) => (
                //         contextMPlase.map((item, index) => (
                < ListGroup >
                    <ListGroupItem>
                        id товара {JSON.stringify(context)}
                    </ListGroupItem>
                </ListGroup>
                //         )
                //         )
                //     )}
                // </ContextMP.Consumer>
            )
            }
        </ContextProduct.Consumer >
    )
}

export default Product;
