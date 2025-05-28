import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="header">
            <div className="header-search-bar">
                <span className="header-search-icon">🔍</span>
                <input type="text" placeholder="Search..." />
            </div>

            <div className="header-actions">
                <button className="go-back-button" onClick={() => navigate('/home')}>
                    ⬅️ Go back home
                </button>
                <button className="header-star-button">
                    <span className="header-star-icon">[StarIcon]</span> Star
                    <span className="header-star-count">1,114</span>
                </button>
                <img src="/img/admin_ava.jpg!bw700" alt="User Avatar" className="header-avatar" />
            </div>
        </header>
    );
};

export default Header;
