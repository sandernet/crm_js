import axios from "axios";

export default class ProductService {
    static async getAll(limit = 10, offset = 0) {
        const response = await axios.get('http://localhost:5000/api/crm/product', {
            params: {
                limit: limit,
                offset: offset,
                images: true,
                price: true
            }
        })
        return response;
    }
    // // получаем товар по id товара
    // static async getById(id) {
    //     const response = await axios.get('http://localhost:5000/api/crm/product', {
    //         params: {
    //             id: id,
    //             full: true
    //         }
    //     })
    //     return response;
    // }

    // // Получем url картинки по id 
    // static imageUrlById = (imageId) => {
    //     if (!imageId)
    //         return
    //     // const filterimages = images.filter((image) => image.typeImage === "urlImage")
    //     return 'http://localhost:5000/api/crm/images/?id=' + imageId;
    // }

    // static async getCommentsByPostId(id) {
    //     const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    //     return response;
    // }


    // static async getPropertyMP(mpId, productId) {
    //     const response = await axios.get(`http://localhost:5000/api/avito/property?marketPlace=${mpId}&product=${productId}`)
    //     return response;
    // }
}
