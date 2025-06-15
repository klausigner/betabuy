import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import './SignIn.css';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignIn = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (
        storedUser &&
        storedUser.username === username &&
        storedUser.password === password
    ) {
        localStorage.setItem('loggedIn', 'true');
        
        const userBasket = JSON.parse(localStorage.getItem(`basket-${username}`)) || [];
        localStorage.setItem('basket', JSON.stringify(userBasket));

        alert('Logged in!');
        navigate('/store');
    } else {
        alert('Invalid credentials');
    }
};

    return (
        <main className="signIn">
            <div className="signInContainer">
                <div className="signInHeader">
                    <h1>You don come back?</h1>
                    <p>Enter your information to sign in.</p>
                </div>

                <div className="signInInputs">
                    <div className="input">
                        <p>Email</p>
                        <input
                            type="text"
                            placeholder="Enter your email"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="input">
                        <p>Password</p>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                <div className="signInLinks">
                    <button onClick={handleSignIn}>Sign in</button>
                    <p>
                        Don't have an account?{' '}
                        <Link to="/signup">Sign up</Link>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default React.memo(SignIn);