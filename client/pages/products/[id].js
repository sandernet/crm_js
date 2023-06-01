import Link from "next/link"
import { useRouter } from "next/router"
import MainContainer from "../../components/MainContainer"

import { ListGroup, ListGroupItem } from 'reactstrap';

export default function Product({ product }) {
    const { query } = useRouter()
    return (
        <>
            <MainContainer>
                <h1>Product c id {query.id}</h1>
                <ListGroup>
                    <ListGroupItem>
                        id товара {product.rows[0].id}
                    </ListGroupItem>
                    <ListGroupItem>
                        article товара {product.rows[0].article}
                    </ListGroupItem>
                    <ListGroupItem>
                        name товара {product.rows[0].name}
                    </ListGroupItem>
                    <ListGroupItem>
                        idMS товара {product.rows[0].idMS}
                    </ListGroupItem>
                    <ListGroupItem>
                        archived товара {product.rows[0].archived}
                    </ListGroupItem>
                    <ListGroupItem>
                        categoryId товара {product.rows[0].categoryId}
                    </ListGroupItem>
                </ListGroup>
            </MainContainer>
        </>
    )
}



export async function getServerSideProps({ params }) {
    const response = await fetch(`http://localhost:5000/api/product?id=${params.id}`)
    const product = await response.json()
    return {
        props: { product }
    }
}