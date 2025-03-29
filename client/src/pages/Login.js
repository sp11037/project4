import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ uname, unameSetter }) => {
    const unameRef = useRef();
    const pwordRef = useRef();
    const [errorMsg, errorMsgSetter] = useState('');
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

                if (u.length === 0 || u[0].pword !== user.pword) {
                    errorMsgSetter('invalid username or password');
                } else {
                    localStorage.setItem('uname', user.uname)
                    unameSetter(user.uname);
                    errorMsgSetter('');
                }
            });
    };

    return (
        <div>
            <h1>Login</h1>
            <div>Username <input type='text' ref={unameRef} /></div>
            <div>Password <input type='password' ref={pwordRef} /></div>
            <div><button onClick={handleLogin}>Login</button></div>
            {errorMsg}
        </div>
    );
};

export default Login;