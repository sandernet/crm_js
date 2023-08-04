import axios from "axios";

export default class MarketPlace {
    // получаем Категории по id товара
    static async getAllTradeOffer() {
        const response = await axios.get('http://localhost:5000/api/marketplace', {
            headers: {
                Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MX0.k0E4fCFP1VDoTcpmlvKekVYldTCQCb2NQVQICz-HSAM",
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
