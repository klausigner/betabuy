import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Store.css';

import Basket from '../../assets/basket.svg';

const Store = ({ setBasketItems }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [visibleCount, setVisibleCount] = useState(8);
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.products);
                const uniqueCategories = ['All', ...new Set(data.products.map(p => p.category))];
                setCategories(uniqueCategories);
            })
            .catch((error) => console.error('Error:', error));
    }, []);
    
    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 8);
    };

    const handleAddToBasket = (product) => {
        const isLoggedIn = localStorage.getItem('loggedIn');
        if (!isLoggedIn || isLoggedIn !== 'true') {
            alert('Please sign in to add items to your basket.');
            window.location.href = '/signin';
            return;
        }

        const existingBasket = JSON.parse(localStorage.getItem('basket')) || [];
        const existingItem = existingBasket.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            existingBasket.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('basket', JSON.stringify(existingBasket));
        setBasketItems(existingBasket);

        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            localStorage.setItem(`basket-${storedUser.username}`, JSON.stringify(existingBasket));
        }
    };

    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(product => product.category === selectedCategory);

    return (
        <main className="store">
            <div className="storeTabs">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => {
                            setSelectedCategory(category);
                            setVisibleCount(8);
                        }}
                        style={{
                            backgroundColor: selectedCategory === category ? '#080808' : '#FFFFFF',
                            color: selectedCategory === category ? '#FFFFFF' : '#888A8C',
                        }}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="storeGrid">
                {filteredProducts.slice(0, visibleCount).map((product) => (
                    <div key={product.id} className="storeCard">

                    <Link to={`/product/${product.id}`}>
                        <div className="storeCardImage">
                        <img src={product.thumbnail} alt={product.title} title={product.title}/>
                        </div>
                    </Link>

                    <div className="storeCardDetails">
                        <div className="textInfo">
                            <Link to={`/product/${product.id}`}>
                                <h4 title={product.title}>{product.title}</h4>
                                <p>${product.price}</p>
                            </Link>
                        </div>
                        <button onClick={() => handleAddToBasket(product)}>
                            <img src={Basket} alt="Add to Basket" title="Add to Basket"/>
                        </button>
                    </div>

                    </div>
                ))}
            </div>

            {visibleCount < filteredProducts.length && (
                <button className="loadMore" onClick={handleLoadMore}>Load more</button>
            )}
        </main>
    );
};

export default React.memo(Store);