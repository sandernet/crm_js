import Link from "next/link"
import { useRouter } from "next/router"
import MainContainer from "../../components/MainContainer"

export default function Product({ product }) {
    const { query } = useRouter()
    return (
        <>
            <MainContainer>
                <h1>Product c id {query.id}</h1>
                <div>
                    <p>id товара {product.rows[0].id}</p>
                    <p>article товара {product.rows[0].article}</p>
                    <p>name товара {product.rows[0].name}</p>
                    <p>idMS товара {product.rows[0].idMS}</p>
                    <p>archived товара {product.rows[0].archived}</p>
                    <p>categoryId товара {product.rows[0].categoryId}</p>
                </div>
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