import axios from "axios";

export default class CategoryService {
    // получаем Категории по id товара
    static async getAllCategories() {
        const response = await axios.get('http://localhost:5000/api/crm/category', {
            headers: {
                Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MX0.k0E4fCFP1VDoTcpmlvKekVYldTCQCb2NQVQICz-HSAM",
            }
        })
        return response;
    }


    // Приводит к иерархическому объекту категорий
    static async buildHierarchy(arr, parentId = null) {
        const result = [];
        for (const item of arr) {
            if (item.parent_id === parentId) {
                const children = await this.buildHierarchy(arr, item.externalCodeMS);
                if (children.length) {
                    item.children = children;
                }
                result.push(item);
            }
        }
        return result;
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
