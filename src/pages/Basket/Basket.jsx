import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './Basket.css';

import BasketSvg from "../../assets/basket.svg";

const Basket = () => {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    const basketItems = JSON.parse(localStorage.getItem('basket')) || [];
    const navigate = useNavigate();

    if (!isLoggedIn) {
        return <div><h1>Your basket</h1><p>Please sign in to view your basket.</p></div>;
    }

    const handleRemove = (id) => {
        const updatedBasket = basketItems.filter(item => item.id !== id);
        localStorage.setItem('basket', JSON.stringify(updatedBasket));
        window.location.reload();
    };

    const handleBuyAll = () => {
        navigate('/checkout', { state: { items: basketItems } });
    };

    return (
    <main className="basket">
        <div className="basketContainer">
            {basketItems.length === 0 ? (
                <div className="emptyBasket">
                    <img src={BasketSvg} alt="Empty basket" title="Empty basket" />

                    <div className="emptyBasketHeader">
                        <h1>Ehya, sorry</h1>
                        <p>Your basket is completely empty. Checkout our store so you can start filling up your basket with exciting stuff!</p>
                    </div>

                    <Link to="/store"><button>Go to store</button></Link>
                </div>
            ) 
            : 
            (
            <div className="filledBasket">
                <div className="basketHeader">
                    <h1>Nah your basket be this</h1>
                    <p>Manage all the items added to your basket.</p>
                </div>

                <div className="basketItemList">
                    {basketItems.map(item => (
                        <div className="basketItems" key={item.id}>
                            <div className="itemDetails">
                                <div className="itemImage">
                                    <img src={item.thumbnail} alt={item.title} title={item.title} />
                                </div>

                                <div className="itemInfo">
                                    <p>{item.title}</p>

                                    <div className="itemPriceQuantity">
                                        <p>${item.price}</p>
                                        <p>x{item.quantity}</p>
                                    </div>
                                </div>
                            </div>

                            <button onClick={() => handleRemove(item.id)}>Remove</button>
                        </div>
                    ))}
                    </div>

                <button onClick={handleBuyAll}>Purchase</button>
            </div>
            )}
        </div>
    </main>
);
};

export default React.memo(Basket);