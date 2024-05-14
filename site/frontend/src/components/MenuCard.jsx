import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tag, Table, Spin, Flex } from 'antd';
import ProductCard from './ProductCard';
import numberWithSpace from "../utils.js";


const columns = [
    {
        title: 'Название',
        dataIndex: 'title',
    },
    {
        title: 'Категория',
        dataIndex: 'category',
        filters: [
            {
                text: 'Быт и дом',
                value: 'Быт и дом',
            },
            {
                text: 'Красота и здоровье',
                value: 'Красота и здоровье',
            },
            {
                text: 'Еда',
                value: 'Еда',
            },
            {
                text: 'Одежда и аксессуары',
                value: 'Одежда и аксессуары',
            },
        ],
        render: (category) => (
            <>
                {
                    <div>
                        {
                            (category == 'Быт и дом') ? (<Tag color="green">{category}</Tag>) :
                                (category == 'Еда') ? (<Tag color="blue">{category}</Tag>) :
                                    (category == 'Одежда и аксессуары') ? (<Tag color="gold">{category}</Tag>) :
                                        (<Tag color="cyan">{category}</Tag>)
                        }
                    </div>}
            </>
        ),
        onFilter: (value, record) => record.category.indexOf(value) === 0
    },
    {
        title: 'Цена',
        dataIndex: 'price',
        render: (price) => <Tag color="#2db7f5">{numberWithSpace(price) + " RUB"}</Tag>,
        sorter: (a, b) => a.price - b.price,
    }
];


const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};





function MenuCard() {

    const [products, setProducts] = useState([])
    const [productId, setProductId] = useState(1)
    const [productData, setProductData] = useState(null)

    const fetchProducts = () => {
        axios.get('http://127.0.0.1:8000/products/').then(r => {
            const productsResponse = r.data
            const menuItems =
                productsResponse.map(c => {
                    return {
                        key: c.id,
                        title: c.title,
                        category: c.category,
                        price: c.price
                    }
                })

            console.log(menuItems)
            setProducts(menuItems)
        })
    }

    const fetchProduct = () => {
        axios.get(`http://127.0.0.1:8000/products/${productId}/`).then(r => {
            setProductData(r.data)
        })
    }

    useEffect(() => {
        fetchProducts()
    }, []);

    useEffect(() => {
        setProductData(null)
        fetchProduct()
    }, [productId]);


    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setProductId(selectedRowKeys);
        }
    };

    return (
        <Flex vertical justify='space-evenly' align='center'>
            <div>
                <Table
                    rowSelection={{
                        type: 'radio',
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={products}
                    onChange={onChange}
                    size='small'
                    pagination={{
                        pageSize: 5,
                      }}
                    scroll={{ x: 100, y: 1000 }}
                    showSorterTooltip={{
                        target: 'sorter-icon',
                    }}
                />
            </div>
            <div>
                {productData ? <ProductCard product={productData} /> : <Spin size="large" />}
            </div>
        </Flex>
    )
};

export default MenuCard;