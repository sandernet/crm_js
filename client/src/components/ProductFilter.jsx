import React from 'react';
import MyInput from "./UI/Input/MyInput";
import MySelect from "./UI/select/MySelect";

const ProductFilter = ({filter, setFilter}) => {
    return (
        <div>
            <MyInput
                value={filter.query}
                onChange={e => setFilter({...filter, query: e.target.value})}
                placeholder="Поиск..."
            />
            {/* можно добавить еще фильтры Такие как каталог */}
            <MySelect
                value={filter.sort}
                onChange={selectedSort => {
                    setFilter({...filter, sort: selectedSort})
                    }}
                defaultValue="Сортировка"
                options={[
                    {value: 'name', name: 'По наименованию'},
                    {value: 'id', name: 'По id товара'},
                ]}
            />
        </div>
    );
};

export default ProductFilter;
