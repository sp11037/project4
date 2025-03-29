import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ uname, unameSetter }) => {
    const navigate = useNavigate();

    localStorage.removeItem('uname');
    unameSetter(null);

    useEffect(() => {
        if (!uname) {
            navigate('/login');
        }
    }, [uname, navigate]);

    return (
        <div>
            <h1>Logged Out</h1>
        </div>
    );
};

export default Logout;