import './signIn.css';
import logo from '../../assets/images/06 logo_horizontal_semrosto.png';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

export default function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signIn } = useContext(AuthContext);

    async function handleSignIn(event) {
        event.preventDefault();
        if (email !== '' && password !== '') {
            await signIn(email, password);
        }
    }

    return (
        <div className='container-panel' >
            <div className="content-area-login">
                <div className="header-login">
                    <img className="logo" src={logo} />
                    <h1>Admin Dashboard</h1>
                </div>
                <form className="form-login" onSubmit={handleSignIn}>
                    <div className="form-group">
                        <label> User:</label>
                        <input
                            type="name"
                            placeholder="seuemail@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label> Password: </label>
                        <input
                            type='password'
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn-login">
                        Login
                    </button>
                    <div className='btn-acess'>
                        <button type='submit' className='access-registration'>
                            <Link to="/register">Register new user.</Link>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}