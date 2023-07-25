import { makeAutoObservable } from "mobx";


export default class ProductsList {
    constructor() {
        this._products = []
        this._count = 0
        this._totalPage = 1
        makeAutoObservable(this)
    }

    setProducts(products) {
        this._products = products
    }
    setCount(count) {
        this._count = count
    }
    setTotalPage(totalPage) {
        this._totalPage = totalPage
    }


    get Products() {
        return this._products
    }
    get Count() {
        return this._count
    }
    get TotalPage() {
        return this._totalPage
    }
}
