import React, {useEffect, useRef, useState} from 'react';
import ProductService from "../API/Product/ProductService";
import {useProducts} from "../hooks/useProducts";
import {useFetching} from "../hooks/useFetching";
import {getPageCount} from "../utils/pages";
import MyButton from "../components/UI/button/MyButton";
import PostForm from "../components/PostForm";
import MyModal from "../components/UI/MyModal/MyModal";
import ProductFilter from "../components/ProductFilter";
import PostList from "../components/PostList";
import Loader from "../components/UI/Loader/Loader";
import Pagination from "../components/UI/pagination/Pagination";
import {useObserver} from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

// Страница с товарами
function Products() {
    // пользовательское состояние
    const [product, setProduct] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false);
    // общее количество страниц товаров
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);


    const sortedAndSearchedPosts = useProducts(product, filter.sort, filter.query);
    const lastElement = useRef()

    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const offset = limit * (page-1)
        const response = await ProductService.getAll(limit, offset);
        
        setProduct([...product, ...response.data["rows"]])
        const totalCount = 565
        // const totalCount = response.data.count
        setTotalPages(getPageCount(totalCount, limit));
    })

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1);
    })

    useEffect(() => {
        fetchPosts(limit, page)
    }, [page, limit])

    const createPost = (newProduct) => {
        setProduct([...product, newProduct])
        setModal(false)
    }

    // Получаем post из дочернего компонента
    const removePost = (post) => {
        setProduct(product.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
    }

    return (
        <div className="App">
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Создать товар
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <ProductFilter
                filter={filter}
                setFilter={setFilter}
            />
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue="Кол-во элементов на странице"
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'},
                    {value: -1, name: 'Показать все'},
                ]}
            />
            {postError &&
            <h1>Произошла ошибка ${postError}</h1>
            }
            <PostList remove={removePost} product={sortedAndSearchedPosts} title="Товары из системы учета"/>
            <div ref={lastElement} style={{height: 20, background: 'red'}}/>
            {isPostsLoading &&
            <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
            }
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div>
    );
}

export default Products;
