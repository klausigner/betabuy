import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './Checkout.css';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const basketItems = location.state?.items || [];

    const totalPrice = basketItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleConfirmPurchase = () => {
        localStorage.removeItem('basket');
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            localStorage.removeItem(`basket-${storedUser.username}`);
        }
        navigate('/');
    };

    return (
        <main className="checkout">
            <div className="checkoutContainer">
                <div className="checkoutHeader">
                    <h1>Oya checkout with steeze!</h1>
                    <p>Purchase all the items in your basket.</p>
                </div>

                <div className="checkoutItems">
                    {basketItems.map(item => (
                        <div className="checkoutItem" key={item.id}>
                            <p>{item.title}</p>

                            <div className="itemDetails">
                                <p>x{item.quantity}</p>
                                <p>${item.price}</p>
                            </div>
                        </div>
                    ))}

                    <div className="checkoutTotal">
                        <p>Total Amount</p> 
                        <p>${totalPrice.toFixed(2)}</p>
                    </div>
                </div>

                <button onClick={handleConfirmPurchase}>Confirm purchase</button>
            </div>
        </main>
    );
};

export default Checkout;