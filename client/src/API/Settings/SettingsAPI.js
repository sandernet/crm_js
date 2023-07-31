import axios from "axios";

export default class SettingsAPI {
    static async loaderCategoryMS() {
        const response = await axios.get('http://localhost:5000/api/moysklad/loadingcategory/', {
        })
        return response;
    }

    static async loaderProductsMS(isLoadingImages = true) {
        const response = await axios.get('http://localhost:5000/api/moysklad/loadingProduct/', {
            params: {
                isLoadingImages: isLoadingImages,
            }
        })
        return response;
    }

}
