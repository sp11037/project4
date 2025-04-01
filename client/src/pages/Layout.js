import { Outlet, Link } from 'react-router-dom';

const Layout = ({ uname }) => {
    if (uname) {
        document.querySelectorAll('.loggedOut').forEach(item => item.classList.add('hidden'));
        document.querySelectorAll('.loggedIn').forEach(item => item.classList.remove('hidden'));
    } else {
        document.querySelectorAll('.loggedOut').forEach(item => item.classList.remove('hidden'));
        document.querySelectorAll('.loggedIn').forEach(item => item.classList.add('hidden'));
    }

    return (
        <>
            <header>
                <h1><Link to='/'>Home</Link></h1>
                <nav>
                    <ul>
                        <li className='loggedIn'>Welcome {uname}</li>
                        <li className='loggedOut'><Link to='/login'>Login</Link></li>
                        <li className='loggedOut'><Link to='/register'>Register</Link></li>
                        <li className='loggedIn'><Link to='/logout'>Logout</Link></li>
                    </ul>
                </nav>
            </header>
            <Outlet />
        </>
    );
};

export default Layout;