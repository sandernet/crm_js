import { Card, CardHeader, CardBody, CardTitle, CardText } from 'reactstrap';


export default function ProductCar() {
    return (
        <>
            <Card
                className="my-2"
                color="primary"
                outline
                style={{
                    width: '18rem'
                }}
            >
                <CardHeader>
                    Header
                </CardHeader>
                <CardBody>
                    <CardTitle tag="h5">
                        Special Title Treatment
                    </CardTitle>
                    <CardText>
                        With supporting text below as a natural lead-in to additional content.
                    </CardText>
                </CardBody>
            </Card>
        </>
    )

}

export async function getServerSideProps({ params }) {
    console.log("params")
    console.log(params)
    const response = await fetch(`http://localhost:5000/api/product?id=${params.id}&mp=${params.mp}`)
    console.log(response)
    const product = await response.json()
    return {
        props: { product }
    }
}