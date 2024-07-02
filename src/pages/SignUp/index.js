import './signUp.css';
import logo from "../../assets/images/06 logo_horizontal_semrosto.png";
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';


export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signUp, loadingAuth } = useContext(AuthContext);

    async function handleSubmit(event) {
        event.preventDefault();
        if (name !== '' && email !== '' && password !== '') {
            await signUp(email, password, name);
        }
    }

    return (
        <div className='container-panel'>
            <div className='content-area-login'>
                <div className='header-login'>
                    <img src={logo} className="logo" alt='logo pagina de login' />
                    <h1>Register</h1>
                </div>

                <form className="form-login" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type='text' placeholder='Seu Nome' value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <input type='text' placeholder='email@email.com' value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <input type='password' placeholder='Sua senha' value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type='submit'  className="btn-login">
                        {loadingAuth ? 'Carregando...' : 'Cadastrar'}
                    </button>
                    <Link to="/login">Já possui uma conta? Faça login.</Link>
                </form>

            </div>

        </div>
    )
}