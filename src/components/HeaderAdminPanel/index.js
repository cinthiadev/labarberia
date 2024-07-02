import './headerAdminPanel.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/06 logo_horizontal_semrosto.png';
import { AuthContext } from '../../contexts/auth';
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Importe o ícone de fechar

function HeaderAdminPanel() {
  const { user, logout } = useContext(AuthContext);
  const [isLinkClicked, setIsLinkClicked] = useState(false);

  async function handleLogout() {
    await logout();
  }

  const [menuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    // Atualiza o estado do tamanho da janela quando a janela for redimensionada
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div id="header-admin">
      {windowWidth < 768 ? ( // Mostra o menu de hambúrguer quando a tela for menor que 768px
        <div className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={handleToggleMenu}>
          {menuOpen ? (
            <div className='content-menu'>
              <div className='content-toggle'>
                <img className='logo-toggle' src={logo} alt="Logo" />
                <div className="close-icon">x</div>
              </div>
              <div className="panel-intro">
                <h2>Edits Panel</h2>
              </div>
              <nav className='navbar'>
                <Link to="/edits-panel">Services</Link>
                <Link to="/edits-footer">Footer</Link>
              </nav>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </div>
          ) : (
            <div className='content-toggle'>
              <img className='logo-toggle' src={logo} alt="Logo" />
              <FaBars onClick={handleToggleMenu} className="menu-icon" />
            </div>
          )}
        </div>
      ) : (
        <div className='sidebar'>
          <div className="navbar">
            <div className="panel-intro">
              <img src={logo} alt="Logo" />
              <h2>Edits Panel</h2>
            </div>
            <div className="links">
              <Link to="/edits-panel">Services</Link>
              <Link to="/edits-footer">Footer</Link>
            </div>
            <div className='botao'>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeaderAdminPanel;
