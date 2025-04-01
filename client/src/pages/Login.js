import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ uname, unameSetter }) => {
    const unameRef = useRef();
    const pwordRef = useRef();
    const navigate = useNavigate();

    // redirect if user is logged in
    useEffect(() => {
        if (uname) {
            navigate('/');
        }
    }, [uname, navigate]);

    const handleLogin = () => {
        let user = {};
        user.uname = unameRef.current.value;
        user.pword = pwordRef.current.value;

        let url = `http://localhost:5000/user/${user.uname}`;
        let parameters = {
            method: 'GET'
        }

        fetch(url, parameters)
            .then(res => res.json())
            .then(json => {
                const u = json.user;
                const errorMsg = document.querySelector('.errorMsg');

                if (u.length === 0 || u[0].pword !== user.pword) {
                    errorMsg.classList.remove('hidden');
                } else {
                    localStorage.setItem('uname', user.uname);
                    unameSetter(user.uname);
                }
            });
    };

    return (
        <div className='accountPage'>
            <div className='accountBox'>
                <h2>Login</h2>
                <div className='formArea'>
                    <input type='text' ref={unameRef} autocomplete='off' placeholder='Username' />
                    <input type='password' ref={pwordRef} autocomplete='off' placeholder='Password' />
                </div>
                <div className='formBtn'><button onClick={handleLogin}>Login</button></div>
                <div className='errorMsg hidden'>Invalid username or password</div>
            </div>
        </div>
    );
};

export default Login;