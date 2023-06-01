
export default function Images({ product }) {
    const urlImages = (id) => {

        return `http://localhost:5000/api/images/?id=${id}`
    }
    if (product?.images?.length !== 0) {
        return (
            <img src={urlImages(product.images[0]['id'])} alt="Картинка" width="30" height="30" />
        )
    }
    else {
        return
    }
}