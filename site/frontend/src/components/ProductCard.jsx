import { Card, Tag, Checkbox, Flex, Divider, Image} from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import numberWithSpace from "../utils.js";

function ProductCard(props) {

    const onChange = (e) => {
        axios.patch(`http://127.0.0.1:8000/products/${id}?availability=${!e.target.checked}`, {
            availability: !e.target.checked
        }).then(response => console.log(response.data))
        setChecked(!e.target.checked)
    };

    const { product } = props

    const id = product.id
    const title = product.title
    const category = product.category
    const is_many = product.is_many
    const price = numberWithSpace(product.price) + " RUB"
    const description = product.description
    const availability = product.availability


    const [checked, setChecked] = useState(availability);

    return (
        <Card
            title={
                <div>
                    <p>{'🌟 ' + title}</p>
                </div>
            }
            bordered={true}
            style={{
                width: 700,
                height: 340,
                'box-shadow': '0 3px 10px rgb(0,0,0,0.2)',
            }}
        >
            <Flex justify='space-evenly' align='center'>
            <div>
                {
                    (category == 'Быт и дом') ? (<Tag color="green">{category}</Tag>) :
                        (category == 'Еда') ? (<Tag color="blue">{category}</Tag>) :
                        (category == 'Одежда и аксессуары') ? (<Tag color="gold">{category}</Tag>) :
                            (<Tag color="cyan">{category}</Tag>)
                }
            </div>
            <Tag color="#2db7f5">{price}</Tag>
            <Checkbox onChange={onChange} checked={!checked}>Занято</Checkbox>
            <Checkbox checked={is_many} disabled>Можно несколько</Checkbox>
            </Flex>
        
            <Divider />
            
            <div>{description}</div>

        </Card>
    )
}

export default ProductCard