import './Sidebar.css';
import React from 'react';

const IconPlaceholder = ({ name, className }) => (
    <span className={`icon-placeholder ${className || ''}`}>{name}</span>
);

const Sidebar = ({ activePage, setActivePage }) => {
    const handleItemClick = (itemId) => {
        setActivePage(itemId); // gọi về Admin để đổi nội dung
    };

    const menuStructure = [
        {
            items: [
                { id: 'Dashboard', iconName: '🏠', text: 'Dashboard', active: true },
            ]
        },
        {
            title: 'MANAGE',
            items: [
                { id: 'Customers', iconName: '🧑‍🤝‍🧑', text: 'Customers', hasArrow: true },
                { id: 'Products', iconName: '📦', text: 'Products', hasArrow: true },
                { id: 'categories', iconName: '📁', text: 'Categories', hasArrow: true },
                { id: 'Orders', iconName: '🛒', text: 'Orders', hasArrow: true },
                { id: 'Coupons', iconName: '🎟️', text: 'Coupons', hasArrow: true },
                { id: 'Reviews', iconName: '⭐', text: 'Reviews', hasArrow: true },
                { id: 'Comments', iconName: '💬', text: 'Comments' },
                { id: 'Reports', iconName: '📈', text: 'Reports' }
            ]
        }
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <span className="sidebar-logo-icon-shape">S</span>
                <span className="sidebar-logo-text">Shoes</span>
            </div>
            <nav className="sidebar-nav">
                {menuStructure.map((section, sectionIndex) => (
                    <React.Fragment key={section.title || `section-${sectionIndex}`}>
                        {section.title && (
                            <h3 className="sidebar-nav-group-title">
                                <span className="sidebar-nav-group-title-line"></span>
                                {section.title}
                            </h3>
                        )}
                        <ul>
                            {section.items.map((item) => (
                                <li
                                    key={item.id}
                                    className={`sidebar-nav-item ${activePage === item.id ? 'sidebar-nav-item--active' : ''}`}
                                    onClick={() => handleItemClick(item.id)}
                                >
                                    <IconPlaceholder name={item.iconName} className="sidebar-nav-item-icon" />
                                    <span className="sidebar-nav-item-text">{item.text}</span>
                                    {item.hasArrow && <span className="sidebar-arrow">›</span>}
                                </li>
                            ))}
                        </ul>
                    </React.Fragment>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
