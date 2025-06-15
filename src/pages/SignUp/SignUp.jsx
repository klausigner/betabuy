import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import './SignUp.css';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignUp = () => {
        localStorage.setItem('user', JSON.stringify({ username, password }));
        alert('User registered!');
        navigate('/signin');
    };

    return (
        <main className="signUp">
            <div className="signUpContainer">
                <div className="signUpHeader">
                    <h1>You go like sign up?</h1>
                    <p>Enter your information to sign up.</p>
                </div>

                <div className="signUpInputs">
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

                <div className="signUpLinks">
                    <button onClick={handleSignUp}>Sign up</button>
                    <p>
                        Already have an account?{' '}
                        <Link to="/signin">Sign in</Link>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default React.memo(SignUp);