import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = ({ uname }) => {
    const unameRef = useRef();
    const pwordRef = useRef();
    const repeatPwordRef = useRef();
    const tosRef = useRef();
    const navigate = useNavigate();

    // redirect if user is logged in
    useEffect(() => {
        if (uname) {
            navigate('/');
        }
    }, [uname, navigate])

    const handleRegister = () => {
        // input data
        let user = {};
        user.uname = unameRef.current.value;
        user.pword = pwordRef.current.value;
        const repeatPword = repeatPwordRef.current.value;
        const tos = tosRef.current.checked;

        // error fields
        const unameError = document.querySelector('#unameError');
        const pwordError = document.querySelector('#pwordError');
        const repeatPwordError = document.querySelector('#repeatPwordError');
        const tosContainer = document.querySelector('#tosContainer');

        let url = `http://localhost:5000/user/${user.uname}`;
        let parameters = {
            method: 'GET'
        }

        fetch(url, parameters)
            .then(res => res.json())
            .then(json => {     // verify information
                const u = json.user;
                let errorCount = 0;
                
                // check if username exists
                if (u.length === 0) {
                    unameError.classList.add('hidden');
                } else {
                    unameError.classList.remove('hidden');
                    errorCount++;
                }

                // check if password is at least 8 characters and contains a number
                if (user.pword.length > 7 && user.pword.search(/\d/) != -1) {
                    pwordError.classList.add('hidden');
                } else {
                    pwordError.classList.remove('hidden');
                    errorCount++;
                }

                // check if repeat password matches password
                if (user.pword === repeatPword) {
                    repeatPwordError.classList.add('hidden');
                } else {
                    repeatPwordError.classList.remove('hidden');
                    errorCount++;
                }

                // check that the tos is accepted
                if (tos) {
                    tosContainer.classList.remove('errorMsg');
                } else {
                    tosContainer.classList.add('errorMsg');
                    errorCount++;
                }

                if (errorCount !== 0) {
                    throw new Error('Invalid new user');
                }
            })
            .then(() => {       // insert new user into database
                url = `http://localhost:5000/user`;
                parameters = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                };

                fetch(url, parameters);
                navigate('/login');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='accountPage'>
            <div className='accountBox'>
                <h2>Register</h2>
                <div className='formArea'>
                    <div>
                        <input type='text' ref={unameRef} autocomplete='off' placeholder='Username' />
                        <span id='unameError' className='errorMsg hidden'>Username already exists / Invalid Username</span>
                    </div>
                    <div>
                        <input type='password' ref={pwordRef} autocomplete='off' placeholder='Password' />
                        <span id='pwordError' className='errorMsg hidden'>Invalid password. Enter a password that is at least 8 characters long and contains a number.</span>
                    </div>
                    <div>
                        <input type='password' ref={repeatPwordRef} autocomplete='off' placeholder='Repeat Password' />
                        <span id='repeatPwordError' className='errorMsg hidden'>The two passwords do not match.</span>
                    </div>
                    <div id='tosContainer'>
                        <input type='checkbox' ref={tosRef} />
                        &nbsp;&nbsp;I agree to the Terms and Conditions and Privacy Policy
                    </div>
                </div>
                <div className='formBtn'><button onClick={handleRegister}>Register</button></div>
            </div>
        </div>
    );
};

export default Register;