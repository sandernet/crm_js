import { useMemo } from "react";

// Сортировка товара
export const useSortedProducts = (products, sort = "name") => {
    const sortedProducts = useMemo(() => {
        if (sort === "name") {
            return [...products].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        if (sort === "id") {
            return [...products].sort((a, b) => a - b)
        }
        return products;
    }, [sort, products])

    return sortedProducts;
}

export const useProducts = (products, sort, query) => {
    const sortedProducts = useSortedProducts(products, sort);

    const sortedAndSearchedProducts = useMemo(() => {
        return sortedProducts.filter(product => product.name.toLowerCase().includes(query.toLowerCase()))
    }, [query, sortedProducts])

    return sortedAndSearchedProducts;
}
