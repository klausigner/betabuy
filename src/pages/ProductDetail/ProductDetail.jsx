import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './ProductDetail.css';

import Minus from "../../assets/minus.svg";
import Plus from "../../assets/plus.svg";

const ProductDetail = ({setBasketItems}) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data));
    }, [id]);

    const handleAddToBasket = () => {
        const isLoggedIn = localStorage.getItem('loggedIn');
        if (!isLoggedIn || isLoggedIn !== 'true') {
            alert('Please sign in to add items to your basket.');
            navigate('/signin');
            return;
        }

        const existingBasket = JSON.parse(localStorage.getItem('basket')) || [];
        const existingItem = existingBasket.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            existingBasket.push({ ...product, quantity });
        }

        localStorage.setItem('basket', JSON.stringify(existingBasket));
        setBasketItems(existingBasket);

        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            localStorage.setItem(`basket-${storedUser.username}`, JSON.stringify(existingBasket));
        }
    };

    const handleBuyNow = () => {
        navigate('/checkout', { state: { items: [{ ...product, quantity }] } });
    };

    const incrementQty = () => setQuantity(quantity + 1);
    const decrementQty = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    if (!product) return <div>Loading...</div>;

    return (
        <main className="productDetail">
            <div className="productDetailContainer">
                <div className="productImage">
                    <img src={product.thumbnail} alt={product.title} title={product.title}/>    
                </div>
            
                <div className="productInfo">
                    <p>{product.brand ? product.brand : "UNKNOWN"}</p>
                    <h2>{product.title}</h2>
                    <p>{product.description}</p>

                    <div className="quantityControl">
                        <button onClick={decrementQty}>
                            <img src={Minus} alt="Decrease" title="Decrease"/>
                        </button>

                        <span>{quantity}</span>

                        <button onClick={incrementQty}>
                            <img src={Plus} alt="Increase" title="Increase"/>
                        </button>
                    </div>

                    <p>${product.price}</p>

                    <div className="buttonGroup">
                        <button onClick={handleAddToBasket}>Add to basket</button>
                        <button onClick={handleBuyNow}>Buy now</button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default React.memo(ProductDetail);